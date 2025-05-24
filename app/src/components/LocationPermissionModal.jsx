import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiMapPin } from "react-icons/fi";

const LocationPermissionModal = ({ onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const requestLocationPermission = () => {
    setIsProcessing(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location access granted:", position);
          setIsProcessing(false);
          onClose(); // Close the modal on success
        },
        (error) => {
          console.error("Error accessing location:", error);
          setIsProcessing(false);
          // Handle permission denied or other errors
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white w-full max-w-md rounded-2xl p-6 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Location Access Required</h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 cursor-pointer bg-gray-100 rounded-full"
          >
            <FiX className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="flex items-center justify-center  my-5">
          <FiMapPin className="w-10 h-10 text-yellow-500" />
        </div>
        <p className="text-gray-600 mb-6">
          Please enable location access to enhance your experience.
        </p>
        {/* <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={requestLocationPermission}
          disabled={isProcessing}
          className="w-full py-3 bg-yellow-500 text-white rounded-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Requesting..." : "Grant Access"}
        </motion.button> */}
      </motion.div>
    </motion.div>
  );
};

export default LocationPermissionModal;
