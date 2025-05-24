import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiShare2, FiCheck } from "react-icons/fi";
import { FaUsers, FaWallet, FaGift } from "react-icons/fa";
import MiniHeader from "../Header/MiniHeader";

const ReferAndEarn = () => {
  const [copied, setCopied] = useState(false);
  const [isEligibleForReferralBonus, setIsEligibleForReferralBonus] =
    useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const referralCode = "KIYU002";

  const referralSteps = [
    {
      icon: <FaUsers className="text-yellow-500 w-6 h-6" />,
      title: "Invite Friends",
      description: "Share your referral code with friends",
    },
    {
      icon: <FaWallet className="text-yellow-500 w-6 h-6" />,
      title: "They Sign Up & Recharge",
      description: "Friend creates account and completes first recharge",
    },
    {
      icon: <FaGift className="text-yellow-500 w-6 h-6" />,
      title: "You Get ₹100",
      description: "Earn a flat ₹100 for every successful referral",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Join me on FoodApp",
        text: `Use my referral code ${referralCode} and get ₹100 off on your first order!`,
        url: "https://foodapp.com/refer",
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-sky-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <MiniHeader heading="Refer & Earn" />

      <div className="p-4 space-y-6 max-w-6xl 2xl:max-w-7xl mx-auto">
        <motion.div
          className={`p-6 rounded-2xl shadow-lg ${
            isEligibleForReferralBonus
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-4xl font-bold">₹100</h2>
              <p className="opacity-90 mt-1">Flat Referral Reward</p>
            </div>
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isEligibleForReferralBonus ? "bg-yellow-600" : "bg-gray-400"
              }`}
            >
              <FaGift className="w-8 h-8" />
            </div>
          </div>
          {!isEligibleForReferralBonus && (
            <p className="text-center text-sm font-medium">
              Referral bonus will be credited after your friend creates an
              account and completes their first recharge.
            </p>
          )}
        </motion.div>

        {/* Referral Code */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-4">Your Referral Code</h3>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-100 p-4 rounded-xl text-center font-mono text-2xl font-bold tracking-widest">
              {referralCode}
            </div>
            <button
              onClick={handleCopy}
              className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600"
            >
              {copied ? (
                <FiCheck className="w-6 h-6" />
              ) : (
                <FiCopy className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600"
            >
              <FiShare2 className="w-6 h-6" />
            </button>
          </div>

          <AnimatePresence>
            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-6 mt-2 bg-white rounded-xl shadow-lg p-2 z-20 max-w-xs"
              >
                <p className="text-sm text-gray-700">
                  Share your code with friends!
                </p>
                {/* Add share buttons here if needed */}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* How it Works */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-4">How it Works</h3>
          <ul className=" list-inside space-y-2 text-gray-700">
            {referralSteps.map((step, idx) => (
              <li key={idx}>
                <div className="flex items-center gap-3">
                  <div className="text-yellow-500">{step.icon}</div>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm">{step.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Terms & Conditions */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            <li>Referral reward is valid for new users only.</li>
            <li>Reward will be credited after first order completion.</li>
            <li>Maximum reward amount per referral is ₹100.</li>
            <li>Referral code must be applied before placing the order.</li>
          </ul>
        </motion.div>

        {/* Share Button */}
        <motion.div className="mb-10" variants={itemVariants}>
          <button
            onClick={handleShare}
            disabled={!isEligibleForReferralBonus}
            className={`w-full py-4 rounded-xl font-semibold text-lg shadow transition ${
              isEligibleForReferralBonus
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Share & Earn ₹100 Now
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReferAndEarn;
