import { FaWallet, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom"; // assuming react-router for navigation

const WalletLowBalanceAlert = ({ walletBalance }) => {
  const [visible, setVisible] = useState(true);

  if (walletBalance > 0 || !visible) return null;

  return (
    <AnimatePresence>
      <Link to="/wallet">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-5 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 border border-yellow-400 text-yellow-900 rounded-xl p-5  mb-6 relative"
        >
          <motion.div
            className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-300 text-yellow-900 shadow-lg flex-shrink-0"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <FaWallet className="w-8 h-8 drop-shadow-md" />
          </motion.div>
          <div>
            <p className="text-sm font-semibold leading-snug flex-1 select-text">
              Your wallet balance is low. Please recharge to continue enjoying
              our Orders.
            </p>
            <span className="inline-block  text-yellow-900 font-semibold py-2 rounded-full transition-colors text-xs whitespace-nowrap">
              Recharge Now
            </span>
          </div>

          <button
            onClick={() => setVisible(false)}
            aria-label="Close notification"
            className="absolute top-0 right-1 text-yellow-700 hover:text-yellow-900 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full p-1.5"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </motion.div>
      </Link>
    </AnimatePresence>
  );
};

export default WalletLowBalanceAlert;
