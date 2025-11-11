import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import NotificationCard from '../components/NotificationCard';
import { notificationAPI } from '../utils/api';

function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await notificationAPI.getAll();
      const formattedNotifications = response.data.map((notif: any) => ({
        id: notif._id,
        type: notif.type || 'info',
        title: notif.message.split(':')[0] || notif.message.substring(0, 30),
        message: notif.message,
        timestamp: formatTimestamp(notif.createdAt),
        isRead: notif.read,
      }));
      setNotifications(formattedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (date: string) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - notifDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return notifDate.toLocaleDateString();
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

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
            <button 
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              Mark all as read
            </button>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <Loader className="animate-spin h-8 w-8 mx-auto text-blue-500 mb-4" />
              <p className="text-gray-600">Loading notifications...</p>
            </div>
          ) : (
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
          )}
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
