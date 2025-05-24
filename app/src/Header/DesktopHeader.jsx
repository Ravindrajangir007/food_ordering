// DesktopHeader.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { FaShoppingBag, FaWallet, FaUserCircle } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import {
  getCurrentAddress,
  getCurrentLocation,
} from "../service/addressService";
import { useCart } from "../context/CartContext";
import { useWallet } from "../context/WalletContext";
import LocationModal from "../comon/LocationModal";

const DesktopHeader = ({ search, cart, wallet, onLocationChange }) => {
  const { totalQuantity } = useCart();
  const { walletBalance } = useWallet();

  const [currentAddress, setCurrentAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Orders", to: "/orders" },
    { label: "Schedules", to: "/my-schedule" },
    { label: "Transactions", to: "/transactions" },
    { label: "Refer & Earn", to: "/refer-and-earn" },
    { label: "Help & Support", to: "/need-help" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <motion.div className="max-w-6xl 2xl:max-w-7xl mx-auto p-2 relative z-10 h-18">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Link to="/">
            <img
              src="/icons/kiyucart-white.png"
              className="w-32"
              alt="Kiyucart Logo"
            />
          </Link>

          {search && (
            <div className="flex items-center gap-5 bg-white rounded-xl overflow-hidden shadow-sm">
              <div
                className="flex items-center gap-2 p-2 cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMapPin className="w-5 h-5 text-yellow-600" />
                </motion.div>
                <div className="text-gray-800 max-w-[180px]">
                  <p className="text-[10px] text-gray-500 truncate">
                    Current Location
                  </p>
                  <h3 className="text-[12px] font-medium truncate">
                    {currentAddress || "Fetching location..."}
                  </h3>
                </div>
              </div>
              <div className="relative flex-grow border-l border-gray-200 w-[400px]">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for dishes, restaurants..."
                  className="w-full pl-12 pr-4 py-4 border-0 bg-white focus:outline-none ring-0 text-sm"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-5">
          {cart && (
            <Link to="/cart" className="relative">
              <motion.div
                className="h-10 rounded-lg px-5 bg-white/80 backdrop-blur-sm flex items-center justify-center relative cursor-pointer"
                whileTap={{ scale: 0.95 }}
                aria-label="Cart"
              >
                <FaShoppingBag className="w-5 h-5 text-yellow-600" />
              </motion.div>
              <AnimatePresence>
                {totalQuantity > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2 left-2 bg-white text-yellow-500 w-5 h-5 text-[10px] rounded-full flex justify-center items-center shadow-md font-medium cursor-pointer"
                  >
                    {totalQuantity}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )}

          {wallet && (
            <Link to="/wallet" aria-label="Wallet">
              <motion.div
                className="h-10 rounded-lg px-5 bg-white/80 backdrop-blur-sm flex items-center justify-center relative cursor-pointer"
                whileTap={{ scale: 0.95 }}
              >
                <FaWallet className="w-5 h-5 text-yellow-600" />
                <motion.span
                  className="absolute -top-3 -right-1 h-5 bg-yellow-400 rounded text-[10px] flex items-center justify-center font-semibold px-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ₹ {walletBalance}
                </motion.span>
              </motion.div>
            </Link>
          )}

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={profileOpen}
              aria-label="User profile menu"
              className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              <FaUserCircle className="w-7 h-7" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow z-50"
                >
                  <nav className="flex flex-col py-2">
                    {menuItems.map(({ label, to }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setProfileOpen(false)}
                        className="px-4 py-2 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-colors text-sm"
                      >
                        {label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors text-sm text-left w-full cursor-pointer"
                    >
                      Logout
                    </button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <LocationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveLocation}
      />
    </motion.div>
  );
};

export default DesktopHeader;
