import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiChevronRight,
  FiBook,
  FiShield,
  FiRefreshCw,
  FiTruck,
  FiInfo,
  FiCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Legal = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const legalSections = {
    terms: {
      title: "Terms & Conditions",
      icon: FiBook,
      color: "bg-blue-500",
      description: "User agreement and service terms",
      content: [
        {
          heading: "1. Acceptance of Terms",
          text: "By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.",
        },
        {
          heading: "2. Use License",
          text: "Permission is granted to temporarily download one copy of the application for personal, non-commercial transitory viewing only.",
        },
        {
          heading: "3. Order Acceptance",
          text: "We reserve the right to refuse service to anyone for any reason at any time. Prices for our products are subject to change without notice.",
        },
        {
          heading: "4. Delivery Terms",
          text: "Delivery times shown during checkout are estimates and may vary based on various factors including weather, traffic, and restaurant preparation time.",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      icon: FiShield,
      color: "bg-yellow-500",
      description: "How we handle your data",
      content: [
        {
          heading: "1. Information Collection",
          text: "We collect information that you provide directly to us, including name, email address, phone number, and delivery address.",
        },
        {
          heading: "2. Use of Information",
          text: "We use the information we collect to provide, maintain, and improve our services, and to communicate with you.",
        },
        {
          heading: "3. Information Sharing",
          text: "We do not share your personal information with third parties except as described in this privacy policy.",
        },
        {
          heading: "4. Data Security",
          text: "We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access.",
        },
      ],
    },
    refund: {
      title: "Refund Policy",
      icon: FiRefreshCw,
      color: "bg-purple-500",
      description: "Our refund process and terms",
      content: [
        {
          heading: "1. Refund Eligibility",
          text: "Refunds are processed if the order is cancelled before the restaurant begins preparing your food.",
        },
        {
          heading: "2. Refund Process",
          text: "Refunds will be processed to the original payment method and may take 5-7 business days to reflect in your account.",
        },
        {
          heading: "3. Partial Refunds",
          text: "Partial refunds may be issued for specific items in case of quality issues or missing items.",
        },
      ],
    },
    shipping: {
      title: "Shipping Policy",
      icon: FiTruck,
      color: "bg-orange-500",
      description: "Delivery terms and conditions",
      content: [
        {
          heading: "1. Delivery Areas",
          text: "We currently deliver to selected areas. Enter your location to check if delivery is available in your area.",
        },
        {
          heading: "2. Delivery Charges",
          text: "Delivery charges are calculated based on distance and may vary during peak hours or adverse weather conditions.",
        },
        {
          heading: "3. Delivery Time",
          text: "Standard delivery time is 30-45 minutes but may vary based on location, weather, and restaurant preparation time.",
        },
      ],
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
        className="bg-white shadow-sm sticky top-0 z-10"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <div className="p-4 flex items-center gap-4">
          {selectedSection ? (
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSection(null)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50"
            >
              <FiArrowLeft className="text-gray-600" />
            </motion.button>
          ) : (
            <Link to="/more">
              <motion.div
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50"
              >
                <FiArrowLeft className="text-gray-600" />
              </motion.div>
            </Link>
          )}
          <div>
            <h1 className="text-xl font-semibold">
              {selectedSection
                ? legalSections[selectedSection].title
                : "Legal Information"}
            </h1>
            <p className="text-sm text-gray-500">
              {selectedSection
                ? "Last updated: March 2024"
                : "Important policies and terms"}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="p-4 space-y-4">
        <AnimatePresence mode="wait">
          {!selectedSection ? (
            // Main Menu
            <motion.div
              key="main-menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Search Bar */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <input
                  type="text"
                  placeholder="Search policies..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>

              {/* Section Cards */}
              <div className="grid gap-4">
                {Object.entries(legalSections)
                  .filter(
                    ([_, section]) =>
                      section.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      section.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map(([key, section]) => (
                    <motion.div
                      key={key}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSection(key)}
                      className="bg-white p-4 rounded-2xl shadow-sm cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 ${section.color} rounded-xl flex items-center justify-center text-white`}
                        >
                          <section.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-lg font-medium">
                            {section.title}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {section.description}
                          </p>
                        </div>
                        <FiChevronRight className="text-gray-400 w-5 h-5" />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ) : (
            // Section Content
            <motion.div
              key="section-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Section Header */}
              <div
                className={`p-6 rounded-2xl ${legalSections[selectedSection].color} text-white`}
              >
                <div className="flex items-center gap-3">
                  {/* <legalSections[selectedSection].icon className="w-6 h-6" /> */}
                  <h2 className="text-xl font-semibold">
                    {legalSections[selectedSection].title}
                  </h2>
                </div>
                <p className="mt-2 text-white/80">
                  {legalSections[selectedSection].description}
                </p>
              </div>

              {/* Content */}
              <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
                {legalSections[selectedSection].content.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <FiCheck className="w-4 h-4 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium">
                          {item.heading}
                        </h3>
                        <p className="mt-1 text-gray-600">{item.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50 p-4 rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <FiInfo className="w-5 h-5" />
                  <p className="text-sm">
                    If you have any questions about these terms, please contact
                    our support team.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Legal;
