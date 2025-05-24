import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const MiniHeader = ({ heading, right }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Save current path in sessionStorage on mount
    sessionStorage.setItem("lastPath", location.pathname);
  }, [location.pathname]);

  const handleBack = () => {
    const lastPath = sessionStorage.getItem("lastPath");

    // If no history or last path equals current path, go home
    if (window.history.length <= 1 || lastPath === location.pathname) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div className="p-4 shadow-md bg-white sticky top-0 h-18 z-50">
      <div className="flex justify-between items-center max-w-6xl 2xl:max-w-7xl mx-auto">
        <button
          onClick={handleBack}
          className="text-lg flex items-center gap-4 cursor-pointer"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-50"
          >
            <FiArrowRight className="rotate-180" />
          </motion.div>
          <h1 className="text-xl font-semibold flex flex-col justify-start items-start">
            {heading}
          </h1>
        </button>
        {right}
      </div>
    </motion.div>
  );
};

export default MiniHeader;
