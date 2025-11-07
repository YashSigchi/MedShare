import { Bell, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface NotificationCardProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
}

function NotificationCard({ type, title, message, timestamp, isRead = false }: NotificationCardProps) {
  const typeConfig = {
    success: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
    error: {
      icon: XCircle,
      color: 'text-red-500',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    warning: {
      icon: AlertCircle,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
    },
    info: {
      icon: Bell,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start space-x-4 p-4 rounded-lg border ${config.border} ${config.bg} ${
        isRead ? 'opacity-60' : ''
      }`}
    >
      <div className={`flex-shrink-0 ${config.color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 mt-1">{message}</p>
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>{timestamp}</span>
        </div>
      </div>
      {!isRead && <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>}
    </motion.div>
  );
}

export default NotificationCard;
