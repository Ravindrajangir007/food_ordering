import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const InvoiceDetails = ({ subtotal, appliedCoupon, tax, total, expend }) => {
  const [isExpanded, setIsExpanded] = useState(expend);

  // Animation Variants
  const slideVariants = {
    hidden: { height: 0, opacity: 0 }, // Start with no height and opacity
    visible: { height: "auto", opacity: 1 }, // Expand to full height and opacity
    exit: { height: 0, opacity: 0 }, // Collapse back to no height and opacity
  };

  return (
    <div className="space-y-2 text-sm mb-4 p-4 pb-0">
      {/* Toggle Button */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-gray-600 font-medium">Invoice Details</span>
        {isExpanded ? (
          <FiChevronUp className="text-gray-600 w-5 h-5" />
        ) : (
          <FiChevronDown className="text-gray-600 w-5 h-5" />
        )}
      </div>

      {/* Invoice Details with Smooth Slide Animation */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="space-y-2 mt-2">
              <div className="flex justify-between">
                <p className="text-gray-600 flex flex-col justify-start items-start">
                  <span>Subtotal</span>
                  <span className="text-[10px] italic">
                    (Included All Taxes)
                  </span>
                </p>
                <span>₹{subtotal}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-yellow-600">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>- ₹{appliedCoupon.discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvoiceDetails;
