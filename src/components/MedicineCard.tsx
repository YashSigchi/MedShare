import { Calendar, Package, MapPin, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface MedicineCardProps {
  id: string;
  name: string;
  manufacturer: string;
  expiryDate: string;
  quantity: number;
  condition: 'New' | 'Opened';
  imageUrl?: string;
  donorName?: string;
  location?: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
  onRequest?: (id: string) => void;
}

function MedicineCard({
  id,
  name,
  manufacturer,
  expiryDate,
  quantity,
  condition,
  imageUrl,
  donorName,
  location,
  status,
  onRequest,
}: MedicineCardProps) {
  const [imageError, setImageError] = useState(false);

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  const conditionColors = {
    New: 'bg-blue-100 text-blue-700',
    Opened: 'bg-orange-100 text-orange-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, shadow: 'xl' }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:border-blue-300 transition-all"
    >
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-green-50">
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package className="h-20 w-20 text-blue-300" />
          </div>
        )}
        {status && (
          <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
            {status}
          </span>
        )}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${conditionColors[condition]}`}>
          {condition}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-4">{manufacturer}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <span>Expires: {expiryDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Package className="h-4 w-4 mr-2 text-blue-500" />
            <span>Quantity: {quantity}</span>
          </div>
          {donorName && (
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-2 text-blue-500" />
              <span>{donorName}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-blue-500" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {onRequest && (
          <button
            onClick={() => onRequest(id)}
            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Request Medicine
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default MedicineCard;
