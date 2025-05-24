import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  getCurrentAddress,
  getCurrentLocation,
} from "../service/addressService";
import { useWallet } from "../context/WalletContext";
import LocationModal from "../comon/LocationModal";

const MobileHeader = ({ vender_length, onLocationChange }) => {
  const { walletBalance } = useWallet();
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchInitialLocation = async () => {
      try {
        const savedLocation = localStorage.getItem("userLocation");
        if (savedLocation) {
          const loc = JSON.parse(savedLocation);
          setCurrentAddress(loc.fullAddress || loc.description || "");
          setCurrentLocation({ lat: loc.lat, lng: loc.lng });
          // Do NOT call onLocationChange here
        } else {
          const loc = await getCurrentLocation();
          const address = await getCurrentAddress(loc.lat, loc.lng);
          setCurrentAddress(address?.fullAddress || "");
          setCurrentLocation(loc);
          // Do NOT call onLocationChange here
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchInitialLocation();
  }, []);

  const handleSaveLocation = (loc) => {
    setCurrentAddress(loc.fullAddress || loc.description || "");
    setCurrentLocation({ lat: loc.lat, lng: loc.lng });
    onLocationChange && onLocationChange({ lat: loc.lat, lng: loc.lng });
    setModalOpen(false);
  };
  return (
    <motion.div
      className="relative h-[250px] bg-yellow-600 to-transparent overflow-hidden "
      initial={{ height: 0 }}
      animate={{ height: vender_length.vender_length > 0 ? "160px" : "70px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Content */}
      <div className="absolute inset-0 p-4">
        <div className="grid grid-cols-2 mb-6">
          <div className="flex items-center gap-3 w-full">
            <motion.div
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 "
              whileTap={{ scale: 0.95 }}
            >
              <FiMapPin className="w-5 h-5 text-white" />
            </motion.div>
            <div
              className="text-white w-full cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <p className="text-sm opacity-90">Kiyucart</p>
              <h3 className="font-medium text-xs text-nowrap overflow-hidden  whitespace-nowrap text-ellipsis">
                {currentAddress || "Fetching location..."}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3 ">
            <Link to="/wallet" className="ml-auto z-30">
              <motion.div
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative"
                whileTap={{ scale: 0.95 }}
              >
                <FaWallet className="w-5 h-5 text-white" />

                <motion.span
                  className="absolute -top-1 -right-1 h-3 bg-yellow-400 rounded text-[10px] flex items-center justify-center font-medium min-w-[40px] px-2 text-nowrap"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ₹ {walletBalance}
                </motion.span>
              </motion.div>
            </Link>
          </div>
        </div>
        {vender_length > 0 && (
          <div className="relative mb-5">
            <FiSearch className="absolute poppins-regular left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 " />
            <input
              type="text"
              placeholder="Search for dishes, restaurants..."
              className="w-full poppins-regular pl-12 pr-4 py-3 rounded-xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        )}
        {/* Search Bar */}
      </div>

      <LocationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveLocation}
      />
    </motion.div>
  );
};

export default MobileHeader;
