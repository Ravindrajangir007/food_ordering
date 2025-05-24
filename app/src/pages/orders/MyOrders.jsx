import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import MiniHeader from "../../Header/MiniHeader";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  const ordersData = {
    ongoing: [
      // {
      //   id: "ORD123456",
      //   date: "27 March, 2024",
      //   time: "12:30 PM",
      //   items: [
      //     {
      //       name: "Butter Chicken",
      //       quantity: 1,
      //       price: 350,
      //       customization: "Spicy, Extra Butter",
      //     },
      //     {
      //       name: "Garlic Naan",
      //       quantity: 2,
      //       price: 60,
      //       customization: "Extra Garlic",
      //     },
      //   ],
      //   status: "preparing",
      //   totalAmount: 470,
      //   deliverySlot: "6:00 AM to 7:00 AM",
      //   restaurant: "Punjabi Tadka",
      //   address: "123, Park Street, Mumbai",
      //   phone: "+91 9876543210",
      // },
      // {
      //   id: "ORD123457",
      //   date: "27 March, 2024",
      //   time: "1:30 PM",
      //   items: [
      //     {
      //       name: "Masala Dosa",
      //       quantity: 1,
      //       price: 120,
      //       customization: "Extra Chutney",
      //     },
      //     {
      //       name: "Filter Coffee",
      //       quantity: 2,
      //       price: 40,
      //     },
      //   ],
      //   status: "on_the_way",
      //   totalAmount: 200,
      //   deliverySlot: "7:00 AM to 8:00 AM",
      //   restaurant: "South Indian Delight",
      //   address: "456, Lake Road, Mumbai",
      //   phone: "+91 9876543211",
      // },
    ],
    past: [
      // ... (previous past orders data)
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-500";
      case "on_the_way":
        return "bg-blue-500";
      case "delivered":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "preparing":
        return "Preparing your order";
      case "on_the_way":
        return "Out for delivery";
      case "delivered":
        return "Delivered";
      default:
        return status;
    }
  };

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
      <MiniHeader heading="My Orders" />
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Orders List */}
        <div className="mx-2 flex p-1 gap-6 my-2 bg-gray-200 relative rounded">
          {["ongoing", "past"].map((tab) => (
            <motion.button
              key={tab}
              whileTap={{ scale: 0.95 }}
              className={`relative py-3 text-sm font-medium transition-colors w-full cursor-pointer z-10 ${
                activeTab === tab ? "text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0.5 top-0.5 left-0 right-0  bg-yellow-600 rounded -z-10"
                />
              )}
              {tab === "ongoing" ? "Ongoing" : "Past Orders"}
            </motion.button>
          ))}
        </div>
        <motion.div
          className="p-2 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {ordersData[activeTab].map((order) => (
            <motion.div
              key={order.id}
              className="bg-white rounded-xl overflow-hidden"
              variants={itemVariants}
            >
              {/* Status Bar */}
              <div className={`h-1.5 ${getStatusColor(order.status)}`} />

              {/* Order Header */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {order.restaurant}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.date} at {order.time}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-800">
                      {getStatusText(order.status)}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      #{order.id}
                    </span>
                  </div>
                </div>

                {/* Delivery Slot */}
                <div className="mt-4 p-3 bg-yellow-50 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FiClock className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs text-yellow-600 font-medium">
                      Delivery Slot
                    </p>
                    <p className="text-sm text-yellow-700">
                      {order.deliverySlot}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-4 py-3 border-t border-b border-gray-100">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                          {item.quantity}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.name}
                          </p>
                          {item.customization && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.customization}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total & Actions */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Total Amount</span>
                  <span className="text-lg font-semibold text-yellow-500">
                    ₹{order.totalAmount}
                  </span>
                </div>

                {/* Restaurant Details */}
                {order.status === "preparing" && (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMapPin className="text-gray-400" />
                      <span>{order.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiPhone className="text-gray-400" />
                      <span>{order.phone}</span>
                    </div>
                  </div>
                )}

                <Link to={`/order`}>
                  <motion.button className="w-full py-3 bg-yellow-500 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
                    View Order Details
                    <FiChevronRight />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Empty State */}
          {ordersData[activeTab].length === 0 && (
            <motion.div
              className="text-center py-12 bg-white rounded-xl"
              variants={itemVariants}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <CiShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-800 font-medium">No Orders Found</h3>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === "ongoing"
                  ? "You don't have any ongoing orders"
                  : "You haven't placed any orders yet"}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyOrders;
