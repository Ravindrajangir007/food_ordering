import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiEdit,
  FiLogOut,
  FiBell,
  FiMoon,
  FiShield,
  FiGlobe,
  FiSmartphone,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";

const AccountPreferences = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
    biometric: true,
    language: "English",
  });

  const user = {
    name: "Rahul Kumar",
    email: "rahul.kumar@example.com",
    phone: "+91 9876543210",
    joinedDate: "March 2024",
    ordersCount: 25,
    preferences,
  };

  const preferenceItems = [
    {
      icon: FiBell,
      title: "Push Notifications",
      description: "Get updates about your orders",
      toggle: true,
      key: "notifications",
    },
    {
      icon: FiMoon,
      title: "Dark Mode",
      description: "Switch to dark theme",
      toggle: true,
      key: "darkMode",
    },
    {
      icon: FiShield,
      title: "Biometric Login",
      description: "Secure your account",
      toggle: true,
      key: "biometric",
    },
    {
      icon: FiGlobe,
      title: "Language",
      description: "Choose your preferred language",
      value: "English",
      key: "language",
    },
  ];

  const handlePreferenceToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <motion.div
        className="min-h-screen bg-sky-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.div
          className="bg-white shadow-sm sticky top-0 z-10"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <div className="p-4 flex items-center gap-4">
            <Link to="/more">
              <motion.div
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50"
              >
                <FiArrowLeft className="text-gray-600" />
              </motion.div>
            </Link>
            <h1 className="text-xl font-semibold">Account & Preferences</h1>
          </div>
        </motion.div>

        <div className="p-4 space-y-4">
          {/* Profile Card */}
          <motion.div
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-2xl shadow-lg text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold backdrop-blur-sm">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    <FiEdit className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-white/80">
                    <FiMail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <FiSmartphone className="w-4 h-4" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between pt-6 border-t border-white/20">
              <div>
                <p className="text-sm text-white/60">Member Since</p>
                <p className="text-lg font-semibold">{user.joinedDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/60">Total Orders</p>
                <p className="text-lg font-semibold">{user.ordersCount}</p>
              </div>
            </div>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Preferences</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {preferenceItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-4 flex items-center justify-between"
                  whileHover={{ backgroundColor: "#f9fafb" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <motion.button
                      className={`w-12 h-6 rounded-full relative ${
                        preferences[item.key] ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                      onClick={() => handlePreferenceToggle(item.key)}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"
                        animate={{ x: preferences[item.key] ? 24 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    </motion.button>
                  ) : (
                    <span className="text-sm text-gray-600">{item.value}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={user}
      />
    </>
  );
};

export default AccountPreferences;
