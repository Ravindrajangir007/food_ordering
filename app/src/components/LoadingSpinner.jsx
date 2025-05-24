import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <motion.div
        className="relative w-16 h-16"
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-t-yellow-500 border-r-yellow-400 border-b-yellow-300 border-l-yellow-200 rounded-full"></div>

        {/* Inner Ring */}
        <motion.div
          className="absolute inset-2 border-4 border-t-yellow-300 border-r-yellow-200 border-b-yellow-500 border-l-yellow-400 rounded-full"
          animate={{
            rotate: -360,
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        ></motion.div>

        {/* Center Dot */}
        <div className="absolute inset-5 bg-yellow-500 rounded-full shadow-lg"></div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
