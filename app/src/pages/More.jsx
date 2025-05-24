import React from "react";
import {
  FaBox,
  FaCalendarCheck,
  FaMoneyBill,
  FaGift,
  FaUsers,
  FaCog,
  FaQuestionCircle,
  FaGavel,
  FaSignOutAlt,
  FaWallet,
} from "react-icons/fa";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MiniHeader from "../Header/MiniHeader";

const More = () => {
  const navigate = useNavigate();
  const categories = [
    {
      title: "Orders & Billing",
      color: "from-blue-500 to-blue-600",
      items: [
        {
          icon: <FaBox className="text-2xl" />,
          label: "My Orders",
          link: "/orders",
          description: "Track your orders",
          color: "bg-blue-100 text-blue-600",
        },
        {
          icon: "📅",
          label: "My Schedule",
          link: "/my-schedule",
          description: "Track your Schedule",
          color: "bg-blue-100 text-blue-600",
        },
        {
          icon: <FaMoneyBill className="text-2xl" />,
          label: "Transactions",
          link: "/transactions",
          description: "Payment history",
          color: "bg-blue-100 text-blue-600",
        },
        // {
        //   icon: <FaCalendarCheck className="text-2xl" />,
        //   label: "Monthly Bill",
        //   link: "/monthly-bill",
        //   description: "View statements",
        //   color: "bg-blue-100 text-blue-600",
        // },
      ],
    },
    {
      title: "Rewards & Offers",
      color: "from-purple-500 to-purple-600",
      items: [
        {
          icon: <FaUsers className="text-2xl" />,
          label: "Refer & Earn",
          link: "/refer-and-earn",
          description: "Invite friends",
          color: "bg-purple-100 text-purple-600",
        },
        // {
        //   icon: <FaGift className="text-2xl" />,
        //   label: "Offer Zone",
        //   link: "/offer-zone",
        //   description: "Latest deals",
        //   color: "bg-blue-100 text-blue-600",
        // },
      ],
    },
    {
      title: "Account Settings",
      color: "from-purple-500 to-purple-600",
      items: [
        // {
        //   icon: <FaCog />,
        //   label: "Account & Preferences",
        //   link: "/account-preferences",
        //   description: "Manage your profile",
        //   color: "bg-blue-100 text-blue-600",
        // },
        {
          icon: <FaWallet />,
          label: "Wallet & Payments",
          link: "/wallet",
          description: "Manage payment methods",
          color: "bg-yellow-100 text-yellow-600",
        },
        {
          icon: <FaQuestionCircle />,
          label: "Need Help?",
          link: "/need-help",
          description: "Get support",
          color: "bg-purple-100 text-purple-600",
        },
        {
          icon: <FaGavel />,
          label: "Legal",
          link: "/legal",
          description: "Terms and policies",
          color: "bg-orange-100 text-orange-600",
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <motion.div
      className="min-h-screen bg-sky-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <MiniHeader
        heading={
          <>
            <h1 className="text-xl font-semibold">Menu</h1>
            <p className="text-sm text-gray-500">Manage your account</p>
          </>
        }
      />

      <main className="p-4 max-w-6xl 2xl:max-w-7xl mx-auto space-y-6">
        {/* Categories */}
        {categories.map((category, index) => (
          <motion.section
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-sm font-semibold mb-2">{category.title}</h2>
            <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm">
              {category.items.map((item, idx) => (
                <li key={item.label}>
                  <Link to={item.link}>
                    <motion.div className="p-4 flex items-center gap-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <div
                        className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <FiChevronRight className="text-gray-400" />
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-red-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Sign Out
          </motion.button>
          <p className="text-center text-xs text-gray-500 mt-4">
            App Version 2.0.1
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default More;
