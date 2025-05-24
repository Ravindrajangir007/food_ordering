import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiMessageSquare,
  FiChevronDown,
  FiUser,
  FiSend,
  FiHelpCircle,
} from "react-icons/fi";
import MiniHeader from "../Header/MiniHeader";
import { Link } from "react-router-dom";

const NeedHelp = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactOptions = [
    {
      icon: FiMail,
      title: "Email Support",
      primary: "help@kiyucart.com",
      secondary: "Response within 24 hours",
      color: "bg-yellow-500",
      action: "Send Email",
      link: "mailto:help@kiyucart.com",
    },
    {
      icon: FiMessageSquare,
      title: "Live Chat",
      primary: "Chat with us",
      secondary: "Typical response < 5 mins",
      color: "bg-purple-500",
      action: "Start Chat",
    },
  ];

  const faqCategories = {
    "Order Related": [
      {
        question: "How can I track my order?",
        answer:
          "You can track your order in the 'My Orders' section. Click on the order to view its real-time status and location.",
      },
      {
        question: "How do I cancel my order?",
        answer:
          "To cancel your order, go to 'My Orders', select the order, and click on 'Cancel Order'. Note that cancellation is only available before the restaurant accepts your order.",
      },
    ],
    "Payment & Refunds": [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept various payment methods including credit/debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and wallet payments for your convenience.",
      },
      {
        question: "How long does refund take?",
        answer:
          "Refunds typically take 5-7 business days to reflect in your account, depending on your bank's processing time.",
      },
    ],
    "Account & Profile": [
      {
        question: "How do I update my profile?",
        answer:
          "Go to 'Account & Preferences' and click on 'Edit Profile' to update your personal information, address, and preferences.",
      },
      {
        question: "How can I change my phone number?",
        answer:
          "To change your registered phone number, please contact our support team for assistance with verification.",
      },
    ],
  };

  return (
    <motion.div
      className="min-h-screen bg-sky-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <MiniHeader
        heading={
          <>
            <h1 className="text-xl font-semibold">Need Help?</h1>
            <p className="text-sm text-gray-500">We're here to assist you</p>
          </>
        }
      />

      <div className="p-4 space-y-6 max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Contact Options */}
        <div className="grid gap-4">
          {contactOptions.map((option, index) => (
            <Link to={option.link}>
              <motion.div
                key={index}
                className="bg-white p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${option.color} flex-shrink-0 rounded-xl flex items-center justify-center text-white`}
                  >
                    <option.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{option.title}</h3>
                    <p className="text-base font-semibold mt-0.5">
                      {option.primary}
                    </p>
                    <p className="text-xs text-gray-500">{option.secondary}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium text-white ${option.color} cursor-pointer`}
                  >
                    {option.action}
                  </motion.button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FiHelpCircle className="text-yellow-500" />
              FAQs
            </h2>
          </div>
          {Object.entries(faqCategories).map(
            ([category, questions], categoryIndex) => (
              <div
                key={category}
                className="border-b border-gray-100 last:border-0"
              >
                <div className="p-4 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-600">
                    {category}
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {questions.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="overflow-hidden"
                      initial={false}
                    >
                      <motion.button
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50"
                        onClick={() =>
                          setExpandedFaq(
                            expandedFaq === `${categoryIndex}-${index}`
                              ? null
                              : `${categoryIndex}-${index}`
                          )
                        }
                      >
                        <span className="text-sm font-medium">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{
                            rotate:
                              expandedFaq === `${categoryIndex}-${index}`
                                ? 180
                                : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiChevronDown className="text-gray-400" />
                        </motion.div>
                      </motion.button>
                      <AnimatePresence>
                        {expandedFaq === `${categoryIndex}-${index}` && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-sm text-gray-600 bg-gray-50">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Help Form */}
        <motion.div
          className="bg-white p-3 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-4">Still need help?</h3>
          <form className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-4 text-gray-400" />
                <textarea
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <FiSend className="w-4 h-4" />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NeedHelp;
