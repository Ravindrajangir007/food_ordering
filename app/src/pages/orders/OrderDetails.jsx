import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiPhone,
  FiMapPin,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaMotorcycle, FaStore, FaWallet } from "react-icons/fa";
import { CiReceipt } from "react-icons/ci";
import MiniHeader from "../../Header/MiniHeader";

const OrderDetails = () => {
  // ... (previous orderData)

  const getStatusPercentage = (status) => {
    switch (status) {
      case "preparing":
        return "33%";
      case "on_the_way":
        return "66%";
      case "delivered":
        return "100%";
      default:
        return "0%";
    }
  };

  const orderData = {
    id: "ORD123456",
    date: "27 March, 2024",
    time: "12:30 PM",
    status: "on_the_way",
    restaurant: {
      name: "Punjabi Tadka",
      address: "Sector 79, Gurugram, Haryana",
      phone: "+91 9876543210",
    },
    delivery: {
      address: "456, Home Street, Another Locality, City",
      instructions: "Please ring the doorbell",
      person: {
        name: "Rahul Kumar",
        phone: "+91 9876543210",
      },
    },
    items: [
      {
        name: "Butter Chicken",
        quantity: 1,
        price: 350,
      },
      {
        name: "Garlic Naan",
        quantity: 2,
        price: 60,
      },
    ],
    payment: {
      subtotal: 470,
      deliveryFee: 40,
      tax: 25,
      total: 535,
      method: "Wallet",
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-sky-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <motion.div
        className="bg-white shadow-sm sticky top-0 z-20"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <MiniHeader
          heading={
            <>
              <h1 className="text-xl font-semibold text-gray-800">
                Order Details
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-500">#{orderData.id}</p>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <p className="text-sm text-gray-500">{orderData.date}</p>
              </div>
            </>
          }
        />
      </motion.div>

      <motion.div
        className="p-2 py-4 space-y-4 max-w-6xl 2xl:max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Order Status Card */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-sm"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold">Order Status</h2>
            <span className="text-sm text-yellow-500 font-medium">
              On Track
            </span>
          </div>

          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-4 left-0 right-0 h-1 bg-gray-100 rounded-full">
              <motion.div
                className="h-full bg-yellow-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: getStatusPercentage(orderData.status) }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            {/* Status Steps */}
            <div className="flex justify-between relative z-10">
              {[
                { icon: FaStore, label: "Confirmed", status: "completed" },
                { icon: FaMotorcycle, label: "On the way", status: "current" },
                { icon: FiCheckCircle, label: "Delivered", status: "pending" },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.status === "completed" || step.status === "current"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <step.icon className="w-5 h-5" />
                  </motion.div>
                  <span
                    className={`text-sm mt-2 ${
                      step.status === "current"
                        ? "text-yellow-500 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-yellow-500">
                <FiClock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Delivery Slot
                </p>
                <p className="text-xs text-yellow-600">6:00 AM to 7:00 AM</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delivery Details */}
        <motion.div className="bg-white p-6 rounded-xl" variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {orderData.delivery.person.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {orderData.delivery.address}
                </p>
                {orderData.delivery.instructions && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-xl text-sm text-gray-600">
                    📝 Note: {orderData.delivery.instructions}
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center"
              >
                <FiPhone className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Restaurant Details */}
        <motion.div className="bg-white p-6 rounded-xl" variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-4">Restaurant</h2>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
              <FaStore className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{orderData.restaurant.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                {orderData.restaurant.address}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center"
            >
              <FiPhone className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          className="bg-white p-6 rounded-xl "
          variants={itemVariants}
        >
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {orderData.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
                  {item.quantity}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-medium">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}

            <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>₹{orderData.payment.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery Fee</span>
                <span>₹{orderData.payment.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Taxes</span>
                <span>₹{orderData.payment.tax}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-3 border-t border-gray-100">
                <span>Total</span>
                <span className="text-yellow-500">
                  ₹{orderData.payment.total}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Info */}
        <motion.div
          className="bg-white p-6 rounded-xl "
          variants={itemVariants}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500">
                <FaWallet className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-medium">
                  Paid via {orderData.payment.method}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Transaction ID: TXN123456789
                </p>
              </div>
            </div>
            <motion.div
              className="px-3 py-1.5 bg-yellow-100 text-yellow-500 rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Paid
            </motion.div>
          </div>
        </motion.div>

        {/* Download Invoice Button
        <motion.button
          className="w-full py-4 bg-yellow-500 text-white rounded-xl flex items-center justify-center gap-2 font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <CiReceipt className="w-5 h-5" />
          Download Invoice
        </motion.button> */}
      </motion.div>
    </motion.div>
  );
};

export default OrderDetails;
