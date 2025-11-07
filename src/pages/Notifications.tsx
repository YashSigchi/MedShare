import { motion } from 'framer-motion';
import NotificationCard from '../components/NotificationCard';

function Notifications() {
  const notifications = [
    {
      id: '1',
      type: 'success' as const,
      title: 'Donation Approved',
      message: 'Your Amoxicillin 500mg donation has been approved and is now visible in the marketplace.',
      timestamp: '2 hours ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'New Request Received',
      message: 'Someone has requested your donated Ibuprofen. Check your dashboard for details.',
      timestamp: '5 hours ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'warning' as const,
      title: 'Verification Pending',
      message: 'Your recent upload is awaiting verification. This usually takes 24-48 hours.',
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: '4',
      type: 'success' as const,
      title: 'Request Approved',
      message: 'Your request for Metformin 1000mg has been approved. The donor will contact you soon.',
      timestamp: '2 days ago',
      isRead: true,
    },
    {
      id: '5',
      type: 'info' as const,
      title: 'Welcome to MedShare',
      message: 'Thank you for joining our community. Start by browsing available medicines or uploading a donation.',
      timestamp: '3 days ago',
      isRead: true,
    },
    {
      id: '6',
      type: 'error' as const,
      title: 'Upload Rejected',
      message: 'Your upload for Aspirin was rejected due to expiry date being too close. Please upload medicines with at least 3 months validity.',
      timestamp: '4 days ago',
      isRead: true,
    },
    {
      id: '7',
      type: 'success' as const,
      title: 'Pickup Confirmed',
      message: 'Your pickup for Lisinopril 10mg has been confirmed for tomorrow at 2 PM.',
      timestamp: '5 days ago',
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            Stay updated with your donations, requests, and platform activities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-6"
        >
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">All Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  You have <span className="font-semibold text-blue-600">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              Mark all as read
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <NotificationCard {...notification} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-16 text-center"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔔</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-600">When you receive updates, they'll appear here</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
