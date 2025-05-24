import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const CartDiffVendorWarningModal = ({
  heading,
  message,
  onClearCart,
  onClose,
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white w-full max-w-md rounded-2xl p-6 text-center mx-2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{heading}</h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </motion.button>
        </div>
        <p className="text-gray-600 text-xs md:text-sm mb-6">{message}</p>
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-3 bg-white text-yellow-500 border border-yellow-500 rounded-xl font-medium cursor-pointer"
          >
            Close
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClearCart}
            className="w-full py-3 bg-yellow-500 text-white rounded-xl font-medium cursor-pointer"
          >
            Yes, Start Fresh
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartDiffVendorWarningModal;
