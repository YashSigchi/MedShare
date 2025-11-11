import { useState, useEffect } from 'react';
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
  Loader,
} from 'lucide-react';
import MedicineCard from '../components/MedicineCard';
import NotificationCard from '../components/NotificationCard';
import { medicineAPI, notificationAPI, getImageUrl } from '../utils/api';

interface DashboardProps {
  userRole: 'donor' | 'receiver' | 'verifier';
}

function Dashboard({ userRole }: DashboardProps) {
  const [donorMedicines, setDonorMedicines] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [userRole]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      if (userRole === 'donor') {
        const medResponse = await medicineAPI.getMyUploads();
        const formattedMedicines = medResponse.data.map((med: any) => ({
          id: med._id,
          name: med.name,
          manufacturer: med.manufacturer,
          expiryDate: new Date(med.expiryDate).toISOString().split('T')[0],
          quantity: med.quantity,
          condition: med.condition,
          status: med.status,
          imageUrl: getImageUrl(med.photo),
        }));
        setDonorMedicines(formattedMedicines);
      }

      const notifResponse = await notificationAPI.getAll();
      const formattedNotifications = notifResponse.data.slice(0, 3).map((notif: any) => ({
        id: notif._id,
        type: notif.type || 'info',
        title: notif.message.split(':')[0] || notif.message.substring(0, 30),
        message: notif.message,
        timestamp: formatTimestamp(notif.createdAt),
      }));
      setNotifications(formattedNotifications);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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

  const stats = {
    donor: [
      { 
        label: 'Total Donations', 
        value: donorMedicines.length.toString(), 
        icon: Package, 
        color: 'blue' 
      },
      { 
        label: 'Approved', 
        value: donorMedicines.filter(m => m.status === 'Approved').length.toString(), 
        icon: CheckCircle, 
        color: 'green' 
      },
      { 
        label: 'Pending', 
        value: donorMedicines.filter(m => m.status === 'Pending').length.toString(), 
        icon: Clock, 
        color: 'yellow' 
      },
      { 
        label: 'Lives Impacted', 
        value: donorMedicines.filter(m => m.status === 'Approved').length * 2 + '', 
        icon: Heart, 
        color: 'red' 
      },
    ],
    receiver: [
      { label: 'Requests Made', value: '0', icon: Search, color: 'blue' },
      { label: 'Approved', value: '0', icon: CheckCircle, color: 'green' },
      { label: 'Pending', value: '0', icon: Clock, color: 'yellow' },
      { label: 'Received', value: '0', icon: Package, color: 'green' },
    ],
    verifier: [
      { label: 'Total Reviews', value: '0', icon: TrendingUp, color: 'blue' },
      { label: 'Approved', value: '0', icon: CheckCircle, color: 'green' },
      { label: 'Rejected', value: '0', icon: XCircle, color: 'red' },
      { label: 'Pending', value: '0', icon: Clock, color: 'yellow' },
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

              {isLoading ? (
                <div className="text-center py-12">
                  <Loader className="animate-spin h-8 w-8 mx-auto text-blue-500 mb-4" />
                  <p className="text-gray-600">Loading...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {userRole === 'donor' && donorMedicines.length > 0 &&
                    donorMedicines.slice(0, 2).map((med) => (
                      <MedicineCard key={med.id} {...med} />
                    ))}
                  {userRole === 'donor' && donorMedicines.length === 0 && (
                    <div className="col-span-2 text-center py-8 text-gray-600">
                      No medicines uploaded yet. <Link to="/upload" className="text-blue-600 hover:underline">Upload your first medicine</Link>
                    </div>
                  )}
                  {userRole === 'receiver' && (
                    <div className="col-span-2 text-center py-8 text-gray-600">
                      Browse the <Link to="/marketplace" className="text-blue-600 hover:underline">marketplace</Link> to request medicines.
                    </div>
                  )}
                  {userRole === 'verifier' && (
                    <div className="col-span-2 text-center py-8 text-gray-600">
                      Visit the <Link to="/verify" className="text-blue-600 hover:underline">verification page</Link> to review pending medicines.
                    </div>
                  )}
                </div>
              )}
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
              {isLoading ? (
                <div className="text-center py-8">
                  <Loader className="animate-spin h-6 w-6 mx-auto text-blue-500 mb-2" />
                </div>
              ) : notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <NotificationCard key={notification.id} {...notification} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-600 text-sm">
                  No notifications yet
                </div>
              )}
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
