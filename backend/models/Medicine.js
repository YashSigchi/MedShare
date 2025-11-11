import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide medicine name'],
      trim: true,
    },
    manufacturer: {
      type: String,
      required: [true, 'Please provide manufacturer'],
      trim: true,
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please provide expiry date'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide quantity'],
      min: 1,
    },
    condition: {
      type: String,
      enum: ['New', 'Opened'],
      required: [true, 'Please provide condition'],
    },
    photo: {
      type: String,
      default: '',
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    verificationNotes: {
      type: String,
      default: '',
    },
    verifier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    verifiedAt: {
      type: Date,
    },
    aiVerification: {
      expiryValid: {
        type: Boolean,
        default: false,
      },
      conditionGood: {
        type: Boolean,
        default: false,
      },
      confidence: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;

