import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiUser, FiFileText, FiTruck } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

const VendorProfile = () => {
  const { vendor } = useAuth(); // Get vendor details from auth context

  // Function to format time
  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vendor Profile</h1>
        <p className="text-sm text-gray-500">
          Your restaurant information and settings managed by the admin.
        </p>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Details */}
        <ProfileCard
          title="Basic Details"
          icon={<FiUser className="h-6 w-6 text-gray-400" />}
        >
          <InfoItem label="Vendor Name" value={vendor.businessName} />
          <InfoItem label="Owner Name" value={vendor.ownerName} />
          <InfoItem label="Phone Number" value={vendor.phone} />
          <InfoItem label="Email" value={vendor.email} />
        </ProfileCard>

        {/* Address */}
        <ProfileCard
          title="Restaurant Address"
          icon={<FiMapPin className="h-6 w-6 text-gray-400" />}
        >
          <InfoItem
            label="Address"
            value={`${vendor.address?.line1} ${vendor.address?.line2}`}
          />
          <InfoItem label="City" value={vendor.address?.city} />
          <InfoItem label="State" value={vendor.address?.state} />
          <InfoItem label="PIN Code" value={vendor.address?.pincode} />
        </ProfileCard>

        {/* Operating Details */}
        <ProfileCard
          title="Delivery Details"
          icon={<FiTruck className="h-6 w-6 text-gray-400" />}
        >
          <InfoItem
            label="Delivery Radius"
            value={`${vendor.deliveryRadius} km`}
          />
          <div>
            <span className="text-sm font-medium text-gray-500">
              Delivery Days
            </span>
            <div className="mt-1 flex flex-wrap gap-2">
              {Object.entries(vendor.deliveryDays || {}).map(
                ([day, isActive]) => (
                  <span
                    key={day}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isActive
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </span>
                )
              )}
            </div>
          </div>
        </ProfileCard>

        {/* Bank Details */}
        <ProfileCard
          title="Bank Information"
          icon={<FiFileText className="h-6 w-6 text-gray-400" />}
        >
          <InfoItem
            label="Account Holder"
            value={vendor.bankDetails?.accountHolderName}
          />
          <InfoItem
            label="Account Number"
            value={vendor.bankDetails?.accountNumber
              ?.replace(/(\d{4})/g, "$1 ")
              .trim()}
          />
          <InfoItem label="Bank Name" value={vendor.bankDetails?.bankName} />
          <InfoItem label="IFSC Code" value={vendor.bankDetails?.ifscCode} />
          <InfoItem label="Branch" value={vendor.bankDetails?.branchName} />
        </ProfileCard>

        {/* Documents */}
        <ProfileCard
          title="Uploaded Documents"
          icon={<FiFileText className="h-6 w-6 text-gray-400" />}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(vendor.documents || {}).map(([docType, docUrl]) => (
              <div key={docType} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 capitalize">
                  {docType.replace(/([A-Z])/g, " $1").trim()}
                </p>
                {docUrl ? (
                  <a
                    href={docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    View Document
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">Not uploaded</p>
                )}
              </div>
            ))}
          </div>
        </ProfileCard>
      </div>
    </motion.div>
  );
};

// Helper component for displaying info items
const InfoItem = ({ label, value }) => (
  <div>
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <p className="mt-1 text-sm text-gray-900">{value || "Not provided"}</p>
  </div>
);

// Helper component for displaying profile cards
const ProfileCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm p-4">
    <div className="flex items-center space-x-3 mb-4">
      {icon}
      <h3 className="text-lg font-medium text-gray-800">{title}</h3>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

export default VendorProfile;
