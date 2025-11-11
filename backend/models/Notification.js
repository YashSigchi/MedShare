import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ['success', 'info', 'warning', 'error'],
      default: 'info',
    },
    relatedMedicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;

