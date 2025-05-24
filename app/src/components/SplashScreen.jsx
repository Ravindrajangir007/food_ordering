import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // Logo animation variants
  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  // Circular loading animation
  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Background Circles */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full border-2 border-white/10"
            variants={circleVariants}
            style={{ scale: 0.5 }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full border-2 border-white/20"
            variants={circleVariants}
            style={{ scale: 0.6, transition: { delay: 0.1 } }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full border-2 border-white/30"
            variants={circleVariants}
            style={{ scale: 0.7, transition: { delay: 0.2 } }}
          />

          <div className="relative z-10 text-center">
            {/* Logo Container */}
            <motion.div
              className="w-auto mx-auto flex items-center justify-center"
              variants={logoVariants}
            >
              <motion.img
                src="/icons/kiyucart-white.png" // Replace with your logo
                alt="App Logo"
                className="w-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-2 text-sm text-white/80"
              variants={itemVariants}
            >
              Delicious food at your doorstep
            </motion.p>
            <motion.span
              className=" bottom-5 right-0 text-xs text-white/50"
              variants={itemVariants}
            >
              Version 1.0.0
            </motion.span>

            {/* Loading Indicator */}
            <motion.div
              className="mt-5 flex justify-center gap-2"
              variants={itemVariants}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    y: [-2, 2],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>

            {/* Version Number */}
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
