import asyncHandler from "express-async-handler";
import Medicine from "../models/Medicine.js";
import Notification from "../models/Notification.js";
import { analyzeMedicineImage } from "../services/aiMedicineChecker.js"; // ✅ Path fixed

/**
 * @desc    Get all pending medicines waiting for verification
 * @route   GET /api/verify/pending
 * @access  Private (Verifier)
 */
export const getPending = asyncHandler(async (req, res) => {
  const medicines = await Medicine.find({ status: "Pending" })
    .sort({ createdAt: 1 })
    .populate("donor", "name email");

  res.status(200).json(medicines);
});

/**
 * @desc    Verify (Approve / Reject) a medicine with AI analysis
 * @route   PATCH /api/verify/:id
 * @access  Private (Verifier)
 */
export const verifyMedicine = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, verificationNotes } = req.body;

  // ✅ Step 1: Validate inputs
  if (!status || !["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({
      message: "Please provide a valid status (Approved or Rejected)",
    });
  }

  // ✅ Step 2: Fetch medicine
  const medicine = await Medicine.findById(id);
  if (!medicine) return res.status(404).json({ message: "Medicine not found" });
  if (medicine.status !== "Pending")
    return res.status(400).json({ message: "Medicine already verified" });

  // ✅ Step 3: Run AI image analysis (Tesseract OCR)
// 🧠 Run AI-based expiry analysis
const aiResult = await analyzeMedicineImage(medicine.photo, medicine.expiryDate);

// 🩺 Attach AI verification results
medicine.aiVerification = {
  expiryValid: aiResult.status === "safe" || aiResult.status === "near-expiry",
  conditionGood: !aiResult.isExpired,
  confidence: aiResult.confidence,
  status: aiResult.status,
  reason: aiResult.reason,
  detectedExpiry: aiResult.detectedExpiry || "",
  aiCheckedAt: new Date(),
};

// Auto-reject if expired or very low confidence
if (aiResult.isExpired || aiResult.confidence < 0.5) {
  medicine.status = "Rejected";
  medicine.verificationNotes = `AI flagged issue: ${aiResult.reason}`;
} else {
  medicine.status = status; // Approve/Reject manually
  medicine.verificationNotes = verificationNotes || aiResult.reason;
}

await medicine.save();

  // ✅ Step 4: Determine final verification status
  let finalStatus = status;
  let finalReason = verificationNotes || aiResult.reason;

  if (aiResult.status === "expired" || aiResult.confidence < 0.5) {
    finalStatus = "Rejected";
    finalReason = `AI flagged issue: ${aiResult.reason}`;
  }

  // ✅ Step 5: Save verification result
  medicine.status = finalStatus;
  medicine.verificationNotes = finalReason;
  medicine.verifier = req.user._id;
  medicine.verifiedAt = new Date();

  // Save AI results into medicine.aiVerification object
  medicine.aiVerification = {
    expiryValid: aiResult.status === "safe" || aiResult.status === "near-expiry",
    conditionGood: !aiResult.isExpired,
    confidence: aiResult.confidence,
    status: aiResult.status,
    reason: aiResult.reason,
    detectedExpiry: aiResult.detectedExpiry || "",
    aiCheckedAt: new Date(),
  };

  await medicine.save();

  // ✅ Step 6: Create a notification for donor
  await Notification.create({
    user: medicine.donor,
    message: `Your medicine "${medicine.name}" has been ${medicine.status.toLowerCase()} (${aiResult.status.toUpperCase()})`,
    type: medicine.status === "Approved" ? "success" : "error",
    relatedMedicine: medicine._id,
  });

  res.status(200).json({
    message: "Medicine verification completed successfully",
    medicine,
    aiResult,
  });
});