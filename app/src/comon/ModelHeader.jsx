import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
const ModelHeader = ({ header, onClose }) => {
  return (
    <div className="p-2 bg-sky-50 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">{header}</h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 bg-gray-200 rounded-full cursor-pointer"
        >
          <FiX className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ModelHeader;
