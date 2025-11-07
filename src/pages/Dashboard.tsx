import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  Bell,
  TrendingUp,
  Users,
  Heart,
} from 'lucide-react';
import MedicineCard from '../components/MedicineCard';
import NotificationCard from '../components/NotificationCard';

interface DashboardProps {
  userRole: 'donor' | 'receiver' | 'verifier';
}

function Dashboard({ userRole }: DashboardProps) {
  const donorMedicines = [
    {
      id: '1',
      name: 'Amoxicillin 500mg',
      manufacturer: 'Pfizer',
      expiryDate: '2025-12-31',
      quantity: 30,
      condition: 'New' as const,
      status: 'Approved' as const,
    },
    {
      id: '2',
      name: 'Ibuprofen 200mg',
      manufacturer: 'Generic Labs',
      expiryDate: '2025-08-15',
      quantity: 50,
      condition: 'Opened' as const,
      status: 'Pending' as const,
    },
  ];

  const receiverRequests = [
    {
      id: '1',
      name: 'Metformin 1000mg',
      manufacturer: 'Novartis',
      expiryDate: '2026-03-20',
      quantity: 60,
      condition: 'New' as const,
      status: 'Approved' as const,
      donorName: 'Sarah Johnson',
    },
    {
      id: '2',
      name: 'Lisinopril 10mg',
      manufacturer: 'Teva',
      expiryDate: '2025-11-10',
      quantity: 30,
      condition: 'New' as const,
      status: 'Pending' as const,
      donorName: 'Michael Chen',
    },
  ];

  const notifications = [
    {
      id: '1',
      type: 'success' as const,
      title: 'Donation Approved',
      message: 'Your Amoxicillin donation has been approved and is now visible in the marketplace.',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'New Request Received',
      message: 'Someone has requested your donated Ibuprofen. Check your dashboard for details.',
      timestamp: '5 hours ago',
    },
    {
      id: '3',
      type: 'warning' as const,
      title: 'Verification Pending',
      message: 'Your recent upload is awaiting verification. This usually takes 24-48 hours.',
      timestamp: '1 day ago',
    },
  ];

  const stats = {
    donor: [
      { label: 'Total Donations', value: '12', icon: Package, color: 'blue' },
      { label: 'Approved', value: '8', icon: CheckCircle, color: 'green' },
      { label: 'Pending', value: '3', icon: Clock, color: 'yellow' },
      { label: 'Lives Impacted', value: '24', icon: Heart, color: 'red' },
    ],
    receiver: [
      { label: 'Requests Made', value: '8', icon: Search, color: 'blue' },
      { label: 'Approved', value: '5', icon: CheckCircle, color: 'green' },
      { label: 'Pending', value: '2', icon: Clock, color: 'yellow' },
      { label: 'Received', value: '5', icon: Package, color: 'green' },
    ],
    verifier: [
      { label: 'Total Reviews', value: '156', icon: TrendingUp, color: 'blue' },
      { label: 'Approved', value: '142', icon: CheckCircle, color: 'green' },
      { label: 'Rejected', value: '14', icon: XCircle, color: 'red' },
      { label: 'Pending', value: '8', icon: Clock, color: 'yellow' },
    ],
  };

  const currentStats = stats[userRole];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {userRole === 'donor' && 'Donor Dashboard'}
            {userRole === 'receiver' && 'Receiver Dashboard'}
            {userRole === 'verifier' && 'Verifier Dashboard'}
          </h1>
          <p className="text-gray-600">
            {userRole === 'donor' && 'Manage your donations and track their impact'}
            {userRole === 'receiver' && 'Browse available medicines and track your requests'}
            {userRole === 'verifier' && 'Review and verify medicine donations'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {userRole === 'donor' && 'My Donations'}
                  {userRole === 'receiver' && 'My Requests'}
                  {userRole === 'verifier' && 'Pending Verifications'}
                </h2>
                {userRole === 'donor' && (
                  <Link
                    to="/upload"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Medicine</span>
                  </Link>
                )}
                {userRole === 'receiver' && (
                  <Link
                    to="/marketplace"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    <Search className="h-4 w-4" />
                    <span>Browse Medicines</span>
                  </Link>
                )}
                {userRole === 'verifier' && (
                  <Link
                    to="/verify"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>View All</span>
                  </Link>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {userRole === 'donor' &&
                  donorMedicines.map((med) => (
                    <MedicineCard key={med.id} {...med} />
                  ))}
                {userRole === 'receiver' &&
                  receiverRequests.map((med) => (
                    <MedicineCard key={med.id} {...med} />
                  ))}
                {userRole === 'verifier' &&
                  donorMedicines.map((med) => (
                    <MedicineCard key={med.id} {...med} />
                  ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                <Link to="/notifications" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {notifications.slice(0, 3).map((notification) => (
                  <NotificationCard key={notification.id} {...notification} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {userRole === 'donor' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 to-green-500 rounded-xl p-8 text-white text-center"
          >
            <Users className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Thank You for Your Generosity!</h3>
            <p className="text-blue-100 mb-6">
              Your donations have helped 24 people access the medications they need. Keep making a difference!
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Donate More Medicines
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
