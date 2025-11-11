import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Shield, Calendar, Package, User, AlertCircle, Loader } from 'lucide-react';
import { verifyAPI, getImageUrl } from '../utils/api';

interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  expiryDate: string;
  quantity: number;
  condition: 'New' | 'Opened';
  imageUrl?: string;
  donorName: string;
  uploadDate: string;
  aiVerification: {
    expiryValid: boolean;
    conditionGood: boolean;
    confidence: number;
  };
}

function Verify() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setIsLoading(true);
      const response = await verifyAPI.getPending();
      const formattedMedicines = response.data.map((med: any) => ({
        id: med._id,
        name: med.name,
        manufacturer: med.manufacturer,
        expiryDate: new Date(med.expiryDate).toISOString().split('T')[0],
        quantity: med.quantity,
        condition: med.condition,
        imageUrl: getImageUrl(med.photo),
        donorName: med.donor?.name || 'Unknown',
        uploadDate: new Date(med.createdAt).toISOString().split('T')[0],
        aiVerification: med.aiVerification || {
          expiryValid: true,
          conditionGood: true,
          confidence: 85,
        },
      }));
      setMedicines(formattedMedicines);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (medicine: Medicine, actionType: 'approve' | 'reject') => {
    setSelectedMedicine(medicine);
    setAction(actionType);
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (selectedMedicine && action) {
      try {
        await verifyAPI.verify(selectedMedicine.id, {
          status: action === 'approve' ? 'Approved' : 'Rejected',
          verificationNotes,
        });
        setMedicines(medicines.filter((m) => m.id !== selectedMedicine.id));
        setShowModal(false);
        setSelectedMedicine(null);
        setAction(null);
        setVerificationNotes('');
      } catch (error) {
        console.error('Error verifying medicine:', error);
        alert('Failed to verify medicine. Please try again.');
      }
    }
  };

  const stats = [
    { label: 'Pending Reviews', value: medicines.length.toString(), color: 'yellow' },
    { label: 'Approved Today', value: '12', color: 'green' },
    { label: 'Rejected Today', value: '2', color: 'red' },
    { label: 'Success Rate', value: '94%', color: 'blue' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Verification Dashboard</h1>
          <p className="text-gray-600">Review and verify medicine donations with AI assistance</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
            >
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Pending Verifications</h2>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <Loader className="animate-spin h-8 w-8 mx-auto text-blue-500 mb-4" />
              <p className="text-gray-600">Loading pending medicines...</p>
            </div>
          ) : medicines.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">No pending verifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {medicines.map((medicine) => (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-3">
                    <div className="h-48 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
                      {medicine.imageUrl ? (
                        <img
                          src={medicine.imageUrl}
                          alt={medicine.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Package className="h-20 w-20 text-blue-300" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{medicine.name}</h3>
                      <p className="text-gray-600">{medicine.manufacturer}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Expires: {medicine.expiryDate}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Package className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Qty: {medicine.quantity}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{medicine.donorName}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Uploaded: {medicine.uploadDate}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Shield className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-gray-900">AI Verification Results</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Expiry Date Valid:</span>
                          <span className={`flex items-center text-sm font-semibold ${medicine.aiVerification.expiryValid ? 'text-green-600' : 'text-red-600'}`}>
                            {medicine.aiVerification.expiryValid ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Valid
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 mr-1" />
                                Invalid
                              </>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Condition:</span>
                          <span className={`flex items-center text-sm font-semibold ${medicine.aiVerification.conditionGood ? 'text-green-600' : 'text-red-600'}`}>
                            {medicine.aiVerification.conditionGood ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Good
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 mr-1" />
                                Poor
                              </>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">AI Confidence:</span>
                          <span className="text-sm font-semibold text-blue-600">
                            {medicine.aiVerification.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex flex-col justify-center space-y-3">
                    <button
                      onClick={() => handleAction(medicine, 'approve')}
                      className="flex items-center justify-center py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(medicine, 'reject')}
                      className="flex items-center justify-center py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </motion.div>
      </div>

      {showModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className={`w-16 h-16 ${action === 'approve' ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {action === 'approve' ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-red-600" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {action === 'approve' ? 'Approve Donation?' : 'Reject Donation?'}
              </h3>
              <p className="text-gray-600">
                {action === 'approve'
                  ? `You are about to approve ${selectedMedicine.name}. This will make it available in the marketplace.`
                  : `You are about to reject ${selectedMedicine.name}. The donor will be notified of this decision.`}
              </p>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Verification Notes (Optional)
                </label>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add any notes about this verification..."
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 py-3 ${action === 'approve' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-lg font-semibold transition-all`}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Verify;
