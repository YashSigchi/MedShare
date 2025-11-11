import asyncHandler from 'express-async-handler';
import Medicine from '../models/Medicine.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

// @desc    Upload medicine
// @route   POST /api/medicines/upload
// @access  Private (Donor)
export const uploadMedicine = asyncHandler(async (req, res) => {
  const { name, manufacturer, expiryDate, quantity, condition } = req.body;

  if (!name || !manufacturer || !expiryDate || !quantity || !condition) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const photo = req.file ? `/uploads/${req.file.filename}` : '';

  const medicine = await Medicine.create({
    name,
    manufacturer,
    expiryDate,
    quantity: parseInt(quantity),
    condition,
    photo,
    donor: req.user._id,
    status: 'Pending',
  });

  // Create notification for verifiers
  const verifiers = await User.find({ role: 'Verifier' });
  for (const verifier of verifiers) {
    await Notification.create({
      user: verifier._id,
      message: `New medicine "${name}" uploaded and awaiting verification`,
      type: 'info',
      relatedMedicine: medicine._id,
    });
  }

  res.status(201).json(medicine);
});

// @desc    Get donor's uploads
// @route   GET /api/medicines/myuploads
// @access  Private (Donor)
export const getMyUploads = asyncHandler(async (req, res) => {
  const medicines = await Medicine.find({ donor: req.user._id })
    .sort({ createdAt: -1 })
    .populate('donor', 'name email');

  res.json(medicines);
});

// @desc    Get pending medicines
// @route   GET /api/medicines/pending
// @access  Private (Verifier)
export const getPendingMedicines = asyncHandler(async (req, res) => {
  const medicines = await Medicine.find({ status: 'Pending' })
    .sort({ createdAt: 1 })
    .populate('donor', 'name email');

  res.json(medicines);
});

// @desc    Approve/Reject medicine
// @route   PATCH /api/medicines/:id/approve
// @access  Private (Verifier)
export const approveMedicine = asyncHandler(async (req, res) => {
  const { status, verificationNotes } = req.body;
  const { id } = req.params;

  if (!status || !['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Please provide valid status (Approved or Rejected)' });
  }

  const medicine = await Medicine.findById(id);

  if (!medicine) {
    return res.status(404).json({ message: 'Medicine not found' });
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

// @desc    Get marketplace medicines (approved only)
// @route   GET /api/medicines/marketplace
// @access  Public
export const getMarketplaceMedicines = asyncHandler(async (req, res) => {
  const { search, expiryBefore, condition } = req.query;

  const query = { status: 'Approved' };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { manufacturer: { $regex: search, $options: 'i' } },
    ];
  }

  if (expiryBefore) {
    query.expiryDate = { $lte: new Date(expiryBefore) };
  }

  if (condition) {
    query.condition = condition;
  }

  const medicines = await Medicine.find(query)
    .sort({ createdAt: -1 })
    .populate('donor', 'name email')
    .select('-verificationNotes -verifier');

  res.json(medicines);
});

