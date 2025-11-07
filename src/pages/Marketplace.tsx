import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin } from 'lucide-react';
import MedicineCard from '../components/MedicineCard';

function Marketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const medicines = [
    {
      id: '1',
      name: 'Amoxicillin 500mg',
      manufacturer: 'Pfizer',
      expiryDate: '2025-12-31',
      quantity: 30,
      condition: 'New' as const,
      donorName: 'Sarah Johnson',
      location: 'New York, NY',
    },
    {
      id: '2',
      name: 'Metformin 1000mg',
      manufacturer: 'Novartis',
      expiryDate: '2026-03-20',
      quantity: 60,
      condition: 'New' as const,
      donorName: 'Michael Chen',
      location: 'Los Angeles, CA',
    },
    {
      id: '3',
      name: 'Ibuprofen 200mg',
      manufacturer: 'Generic Labs',
      expiryDate: '2025-08-15',
      quantity: 50,
      condition: 'Opened' as const,
      donorName: 'Emily Rodriguez',
      location: 'Chicago, IL',
    },
    {
      id: '4',
      name: 'Lisinopril 10mg',
      manufacturer: 'Teva',
      expiryDate: '2025-11-10',
      quantity: 30,
      condition: 'New' as const,
      donorName: 'David Kim',
      location: 'Houston, TX',
    },
    {
      id: '5',
      name: 'Atorvastatin 20mg',
      manufacturer: 'Lipitor',
      expiryDate: '2026-01-25',
      quantity: 45,
      condition: 'New' as const,
      donorName: 'Jennifer Lee',
      location: 'Phoenix, AZ',
    },
    {
      id: '6',
      name: 'Omeprazole 40mg',
      manufacturer: 'AstraZeneca',
      expiryDate: '2025-09-30',
      quantity: 28,
      condition: 'Opened' as const,
      donorName: 'Robert Taylor',
      location: 'Philadelphia, PA',
    },
  ];

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCondition = selectedCondition === 'all' || medicine.condition.toLowerCase() === selectedCondition;
    return matchesSearch && matchesCondition;
  });

  const handleRequest = (id: string) => {
    navigate(`/request/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Medicine Marketplace</h1>
          <p className="text-gray-600">Browse available medications and health supplies from verified donors</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200"
        >
          <div className="grid md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by medicine name or manufacturer..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Conditions</option>
                    <option value="new">New Only</option>
                    <option value="opened">Opened</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Any time</option>
                    <option>Within 3 months</option>
                    <option>Within 6 months</option>
                    <option>Within 1 year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="City or ZIP code"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredMedicines.length}</span> medicines
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine, index) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MedicineCard {...medicine} onRequest={handleRequest} />
            </motion.div>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;
