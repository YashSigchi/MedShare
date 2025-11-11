import asyncHandler from 'express-async-handler';
import Medicine from '../models/Medicine.js';
import Notification from '../models/Notification.js';

// @desc    Get pending medicines for verification
// @route   GET /api/verify/pending
// @access  Private (Verifier)
export const getPending = asyncHandler(async (req, res) => {
  const medicines = await Medicine.find({ status: 'Pending' })
    .sort({ createdAt: 1 })
    .populate('donor', 'name email');

  res.json(medicines);
});

// @desc    Approve/Reject medicine
// @route   PATCH /api/verify/:id
// @access  Private (Verifier)
export const verifyMedicine = asyncHandler(async (req, res) => {
  const { status, verificationNotes } = req.body;
  const { id } = req.params;

  if (!status || !['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Please provide valid status (Approved or Rejected)' });
  }

  const medicine = await Medicine.findById(id);

  if (!medicine) {
    return res.status(404).json({ message: 'Medicine not found' });
  }

  if (medicine.status !== 'Pending') {
    return res.status(400).json({ message: 'Medicine has already been verified' });
  }

  medicine.status = status;
  medicine.verificationNotes = verificationNotes || '';
  medicine.verifier = req.user._id;
  medicine.verifiedAt = new Date();

  await medicine.save();

  // Create notification for donor
  await Notification.create({
    user: medicine.donor,
    message: `Your medicine "${medicine.name}" has been ${status.toLowerCase()}`,
    type: status === 'Approved' ? 'success' : 'error',
    relatedMedicine: medicine._id,
  });

  res.json(medicine);
});

