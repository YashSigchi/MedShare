import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Shield,
  Calendar,
  Package,
  User,
  AlertCircle,
  Loader,
  Info,
} from "lucide-react";
import { verifyAPI, getImageUrl } from "../utils/api";

interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  expiryDate: string;
  quantity: number;
  condition: "New" | "Opened";
  imageUrl?: string;
  donorName: string;
  uploadDate: string;
  aiVerification: {
    expiryValid: boolean;
    conditionGood: boolean;
    confidence: number;
    status: string;
    reason: string;
    detectedExpiry: string;
  };
}

function Verify() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");

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
        expiryDate: new Date(med.expiryDate).toISOString().split("T")[0],
        quantity: med.quantity,
        condition: med.condition,
        imageUrl: getImageUrl(med.photo),
        donorName: med.donor?.name || "Unknown",
        uploadDate: new Date(med.createdAt).toISOString().split("T")[0],
        aiVerification: med.aiVerification || {
          expiryValid: false,
          conditionGood: false,
          confidence: 0,
          status: "unknown",
          reason: "No AI data available.",
          detectedExpiry: "",
        },
      }));
      setMedicines(formattedMedicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (medicine: Medicine, actionType: "approve" | "reject") => {
    setSelectedMedicine(medicine);
    setAction(actionType);
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (selectedMedicine && action) {
      try {
        await verifyAPI.verify(selectedMedicine.id, {
          status: action === "approve" ? "Approved" : "Rejected",
          verificationNotes,
        });
        setMedicines((prev) => prev.filter((m) => m.id !== selectedMedicine.id));
        setShowModal(false);
        setSelectedMedicine(null);
        setAction(null);
        setVerificationNotes("");
      } catch (error) {
        console.error("Error verifying medicine:", error);
        alert("Failed to verify medicine. Please try again.");
      }
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-green-600";
      case "near-expiry":
        return "text-yellow-600";
      case "expired":
        return "text-red-600";
      case "invalid":
        return "text-gray-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Verification Dashboard</h1>
          <p className="text-gray-600">
            Review and verify medicine donations with integrated AI assistance
          </p>
        </motion.div>

        {isLoading ? (
          <div className="p-12 text-center">
            <Loader className="animate-spin h-8 w-8 mx-auto text-blue-500 mb-4" />
            <p className="text-gray-600">Loading pending medicines...</p>
          </div>
        ) : medicines.length === 0 ? (
          <div className="p-12 text-center text-gray-600">No pending verifications</div>
        ) : (
          <div className="grid gap-6">
            {medicines.map((medicine) => (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white shadow-md border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-3">
                    <img
                      src={medicine.imageUrl || "/placeholder.jpg"}
                      alt={medicine.name}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">{medicine.name}</h3>
                    <p className="text-gray-600">{medicine.manufacturer}</p>

                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <span>
                        <Calendar className="inline h-4 w-4 mr-1 text-blue-500" />
                        Expires: {medicine.expiryDate}
                      </span>
                      <span>
                        <Package className="inline h-4 w-4 mr-1 text-blue-500" />
                        Qty: {medicine.quantity}
                      </span>
                      <span>
                        <User className="inline h-4 w-4 mr-1 text-blue-500" />
                        Donor: {medicine.donorName}
                      </span>
                      <span>
                        <Calendar className="inline h-4 w-4 mr-1 text-blue-500" />
                        Uploaded: {medicine.uploadDate}
                      </span>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
                      <div className="flex items-center mb-3">
                        <Shield className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-gray-900">AI Verification</span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className={`font-semibold ${statusColor(medicine.aiVerification.status)}`}>
                            {medicine.aiVerification.status?.toUpperCase() || "N/A"}
                          </span>
                        </div>

                        {medicine.aiVerification.detectedExpiry && (
                          <div className="flex justify-between">
                            <span>Detected Expiry:</span>
                            <span className="font-semibold text-gray-700">
                              {medicine.aiVerification.detectedExpiry}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span>Confidence:</span>
                          <span className="font-semibold text-blue-600">
                            {(medicine.aiVerification.confidence * 100).toFixed(0)}%
                          </span>
                        </div>

                        <div className="flex items-start gap-2 pt-2">
                          <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                          <span className="text-gray-700">{medicine.aiVerification.reason}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex flex-col justify-center gap-3">
                    <button
                      onClick={() => handleAction(medicine, "approve")}
                      className="flex items-center justify-center py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" /> Approve
                    </button>
                    <button
                      onClick={() => handleAction(medicine, "reject")}
                      className="flex items-center justify-center py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                      <XCircle className="h-5 w-5 mr-2" /> Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 ${
                  action === "approve" ? "bg-green-100" : "bg-red-100"
                } rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {action === "approve" ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-red-600" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {action === "approve" ? "Approve Donation?" : "Reject Donation?"}
              </h3>
              <p className="text-gray-600">
                {action === "approve"
                  ? `Approve ${selectedMedicine.name} for marketplace listing.`
                  : `Reject ${selectedMedicine.name}. The donor will be notified.`}
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
                  placeholder="Add any notes..."
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 py-3 ${
                  action === "approve" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                } text-white rounded-lg font-semibold`}
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
