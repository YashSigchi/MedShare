import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Calendar, User, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

function RequestConfirm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const medicine = {
    id: id || '1',
    name: 'Amoxicillin 500mg',
    manufacturer: 'Pfizer',
    expiryDate: '2025-12-31',
    quantity: 30,
    condition: 'New',
    donorName: 'Sarah Johnson',
    location: 'New York, NY',
    imageUrl: '',
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Sent Successfully!</h2>
            <p className="text-gray-600 text-lg mb-6">
              Your request for <strong>{medicine.name}</strong> has been sent to {medicine.donorName}.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-blue-800">
                <strong>What happens next?</strong>
                <br />
                The donor will review your request and respond within 24-48 hours. You'll receive a notification once they approve or provide further instructions for pickup/delivery.
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Confirm Request</h1>
              <p className="text-gray-600">Review the details before sending your request</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="grid md:grid-cols-5 gap-8 mb-8">
                  <div className="md:col-span-2">
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                      <Package className="h-32 w-32 text-blue-300" />
                    </div>
                  </div>

                  <div className="md:col-span-3 space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{medicine.name}</h2>
                      <p className="text-lg text-gray-600">{medicine.manufacturer}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                        <div>
                          <span className="text-sm text-gray-500 block">Expiry Date</span>
                          <span className="font-semibold">{medicine.expiryDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Package className="h-5 w-5 mr-3 text-blue-500" />
                        <div>
                          <span className="text-sm text-gray-500 block">Quantity</span>
                          <span className="font-semibold">{medicine.quantity} units</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <AlertCircle className="h-5 w-5 mr-3 text-blue-500" />
                        <div>
                          <span className="text-sm text-gray-500 block">Condition</span>
                          <span className="font-semibold">{medicine.condition}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <User className="h-5 w-5 mr-3 text-blue-500" />
                        <div>
                          <span className="text-sm text-gray-500 block">Donor</span>
                          <span className="font-semibold">{medicine.donorName}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin className="h-5 w-5 mr-3 text-blue-500" />
                        <div>
                          <span className="text-sm text-gray-500 block">Location</span>
                          <span className="font-semibold">{medicine.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-900 mb-2">Important Information</p>
                      <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                        <li>Verify medicine details with the donor before pickup</li>
                        <li>Check packaging integrity and expiry date in person</li>
                        <li>Follow proper storage instructions after receiving</li>
                        <li>Consult your healthcare provider before use</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <p className="text-sm text-blue-800">
                    By confirming this request, you agree to coordinate directly with the donor for pickup or delivery arrangements. MedShare facilitates the connection but is not responsible for the transfer of medications.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Back to Marketplace
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Confirm Request'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default RequestConfirm;
