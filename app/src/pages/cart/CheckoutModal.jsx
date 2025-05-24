import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiX,
  FiCheck,
  FiMapPin,
  FiClock,
  FiShoppingBag,
  FiAlertCircle,
  FiCheckCircle,
  FiEdit2,
} from "react-icons/fi";
import { BsReceiptCutoff } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import { createScheduledOrder } from "../../service/checkout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ModelHeader from "../../comon/ModelHeader";

const CheckoutModal = ({
  onClose,
  cartItems,
  selectedAddress,
  selectedDays,
  selectedSlot,
  total,
  walletBalance,
  onEditAddress,
  onEditSchedule,
}) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [amountToPay, setAmountToPay] = useState((total || 0).toFixed());
  const isBalanceSufficient = walletBalance >= amountToPay;

  const handleCheckout = async () => {
    if (!isBalanceSufficient) {
      // Wallet balance insufficient, redirect or show message
      window.location.href = "/wallet";
      return;
    }

    setIsProcessing(true);

    // Build payload
    const payload = {
      customer_token: localStorage.getItem("token"),
      cart_items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        category_icon: item.category_icon,
        isVeg: item.isVeg,
        quantity: item.quantity,
        price: item.price,
        mainImage: item.mainImage,
      })),
      vendor: cartItems[0].vendor_id,
      delivery_address: selectedAddress,
      delivery_slot: selectedSlot,
      delivery_days: selectedDays,
      coupon_code: "",
      subtotal: total,
      coupon_discount: 0,
      platform_fee: 0,
      delivery_fee: 0,
      total_amount: amountToPay,
    };

    try {
      // Using axios instance api from your code
      const response = await createScheduledOrder(payload);
      console.log("response", response);
      if (response.success) {
        setIsProcessing(false);
        setIsSuccess(true);

        localStorage.removeItem("cart");
        localStorage.removeItem("selected_address");
        localStorage.removeItem("selected_days");
        localStorage.removeItem("selected_slots");
        clearCart();
        setTimeout(() => {
          navigate("/my-schedule");
        }, 2000);
      } else {
        throw new Error(response.data.message || "Checkout failed");
      }
    } catch (error) {
      setIsProcessing(false);
      alert("Error during checkout: " + error.message);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full max-w-md rounded-2xl p-6 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FiCheckCircle className="w-8 h-8 text-yellow-500" />
          </motion.div>
          <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been successfully scheduled. You can view your order
            in the Schedule section.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/my-schedule")}
            className="w-full py-3 bg-yellow-500 text-white rounded-xl font-medium"
          >
            View Schedule
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-sky-50 w-full max-w-md rounded-t-3xl overflow-hidden max-h-[85vh] overflow-y-auto relative"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModelHeader header="Confirm Schedule" onClose={onClose} />

        <div className="p-2 space-y-2">
          {/* Delivery Details */}

          {/* Address - Clickable */}

          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={onEditAddress}
            className="flex items-start gap-3  bg-white rounded-xl cursor-pointer "
          >
            <div className="flex-1">
              <div className="flex justify-between items-center gap-2 border-b border-b-gray-200 p-3 pb-2">
                <div className="flex items-center gap-2 ">
                  <FiMapPin className="w-4 h-4 text-yellow-500" />
                  <h3 className="poppins-medium text-sm">Delivery Address</h3>
                </div>
                <div className=" ">
                  <FiEdit2 className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <p className="text-xs poppins-regular p-3">
                {selectedAddress.flat_no}, {selectedAddress.floor_no},{" "}
                {selectedAddress.building_name}, {selectedAddress.landmark},{" "}
                {selectedAddress.fullAddress}
              </p>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={onEditSchedule}
            className="flex items-start gap-3  bg-white  rounded-xl cursor-pointer"
          >
            <div className="flex-1">
              <div className="flex justify-between items-center gap-2 border-b border-b-gray-200 p-3 pb-2">
                <div className="flex items-center gap-2 ">
                  <FiClock className="w-4 h-4 text-yellow-500" />
                  <h3 className="poppins-medium text-sm">
                    Delivery Schedule
                    <span className="poppins-regular text-xs underline ml-5">
                      {selectedDays.length} Days
                    </span>
                  </h3>
                </div>
                <div className=" ">
                  <FiEdit2 className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="text-xs poppins-regular p-3 space-y-5">
                <div className="space-y-2">
                  {selectedSlot
                    ? Object.entries(selectedSlot).map(([cat, slot]) => (
                        <p
                          key={cat}
                          className="flex justify-between pb-1 border-b border-gray-200"
                        >
                          <strong>{cat}</strong> {slot.display_time}
                        </p>
                      ))
                    : "No slot selected"}
                </div>
                <div className="space-x-1 flex justify-start items-center">
                  {selectedDays && selectedDays.length > 0
                    ? selectedDays.map((day, index) => (
                        <div
                          className="bg-gray-300 w-7 h-7 flex justify-center items-center rounded-full"
                          key={index}
                        >
                          {day}
                        </div>
                      ))
                    : "No days selected"}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className="flex items-start gap-3  bg-white  rounded-xl"
          >
            <div className="flex-1">
              <div className="flex justify-between items-center gap-2 border-b border-b-gray-200 p-3 pb-2">
                <div className="flex items-center gap-2 ">
                  <FiShoppingBag className="w-4 h-4 text-yellow-500" />
                  <h3 className="poppins-medium text-sm">Order Summary</h3>
                </div>
              </div>
              <div className="text-xs poppins-regular p-3">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center py-2 ${
                      index !== cartItems.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">x{item.quantity}</span>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className="flex items-start gap-3 bg-white  rounded-xl "
          >
            <div className="flex-1">
              <div className="flex justify-between items-center gap-2 border-b border-b-gray-200 p-3 pb-2">
                <div className="flex items-center gap-2 ">
                  <BsReceiptCutoff className="w-4 h-4 text-yellow-500" />
                  <h3 className="poppins-medium text-sm">Payment Summary</h3>
                </div>
              </div>
              <div className="text-xs poppins-regular p-3">
                <div className="flex justify-between border-b border-gray-200 py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                  <span className="text-gray-600">Platform Fee</span>
                  <div className="space-x-4">
                    <del>₹10</del>
                    <span className="text-yellow-500">Free</span>
                  </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                  <span className="text-gray-600">Delivery Fee</span>
                  <div className="space-x-4">
                    <del>₹30</del>
                    <span className="text-yellow-500">Free</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">₹{amountToPay}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Wallet Balance */}
          <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-xl">
            <div className="flex items-center gap-2">
              <FaWallet className="w-5 h-5 text-yellow-800" />
              <span className="font-medium text-sm">Wallet Balance</span>
            </div>
            <span className="font-medium text-yellow-800 text-sm">
              ₹{walletBalance}
            </span>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 p-3 rounded-xl">
            <div className="flex items-start gap-2">
              <FiAlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-xs text-yellow-700">
                <p className="font-medium mb-1">Important Notes:</p>
                <ul className="space-y-1">
                  <li>• Order cannot be cancelled once confirmed</li>
                  <li>
                    • Delivery time might vary based on traffic conditions
                  </li>
                  <li>• Keep exact change ready for cash payments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <motion.div
          className="sticky bottom-0 left-0 right-0 overflow-hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <AnimatePresence>
            {!isBalanceSufficient && (
              <motion.div
                className="bg-red-50 border-b border-red-100 p-2 rounded-t-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <p className="text-center text-sm text-red-600">
                  Insufficient wallet balance. Add ₹
                  {(amountToPay - walletBalance).toFixed(2)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="border-t border-gray-100 bg-white p-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 
        ${
          isProcessing
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-yellow-500 text-white cursor-pointer"
        }`}
            >
              {!isBalanceSufficient ? (
                <>
                  <FaWallet className="w-5 h-5" />
                  Add Funds
                </>
              ) : isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </>
              ) : (
                <>
                  <FiCheck className="w-5 h-5" />
                  Confirm Schedule
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutModal;
