import asyncHandler from 'express-async-handler';
import Medicine from '../models/Medicine.js';
import Notification from '../models/Notification.js';

// @desc    Get all verified medicines for marketplace
// @route   GET /api/marketplace
// @access  Public
export const getMarketplace = asyncHandler(async (req, res) => {
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

// @desc    Request a medicine
// @route   POST /api/marketplace/request/:id
// @access  Private (Receiver)
export const requestMedicine = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const medicine = await Medicine.findById(id).populate('donor', 'name email');

  if (!medicine) {
    return res.status(404).json({ message: 'Medicine not found' });
  }

  if (medicine.status !== 'Approved') {
    return res.status(400).json({ message: 'Medicine is not available for request' });
  }

  // Create notification for donor
  await Notification.create({
    user: medicine.donor,
    message: `${req.user.name} has requested your medicine "${medicine.name}"`,
    type: 'info',
    relatedMedicine: medicine._id,
  });

  // Create notification for receiver
  await Notification.create({
    user: req.user._id,
    message: `Your request for "${medicine.name}" has been sent to ${medicine.donor.name}`,
    type: 'success',
    relatedMedicine: medicine._id,
  });

  res.json({
    message: 'Request sent successfully',
    medicine: {
      id: medicine._id,
      name: medicine.name,
      donor: medicine.donor,
    },
  });
});

