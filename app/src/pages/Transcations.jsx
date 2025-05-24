import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiFile } from "react-icons/fi";
import {
  FaPlus,
  FaWallet,
  FaGift,
  FaSyncAlt,
  FaRupeeSign,
} from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineCreditScore } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWallet } from "../context/WalletContext";
import { fetchTransactions } from "../service/payment";
import MiniHeader from "../Header/MiniHeader";

const TransactionIcon = ({ transactionType }) => {
  const iconMapping = {
    recharge: {
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-100">
          <FaWallet className="text-xl text-yellow-500" />
        </div>
      ),
    },
    cashback: {
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-100">
          <FaGift className="text-xl text-blue-500" />
        </div>
      ),
    },
    referral_bonus: {
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-100">
          <MdOutlineCreditScore className="text-xl text-purple-500" />
        </div>
      ),
    },
    refund: {
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-100">
          <FaSyncAlt className="text-xl text-yellow-500" />
        </div>
      ),
    },
    order_payment: {
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-100">
          <CiShoppingCart className="text-xl text-red-500" />
        </div>
      ),
    },
    adjustment: {
      icon: (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
          <FaRupeeSign className="text-xl text-gray-500" />
        </div>
      ),
    },
  };

  const { icon } = iconMapping[transactionType] || {
    icon: (
      <div className="w-10 h-10 rounded-xl flex items-center justify-center">
        <FaWallet className="text-xl text-yellow-500" />
      </div>
    ),
  };

  return icon;
};

const Transactions = () => {
  const { walletBalance } = useWallet();
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await fetchTransactions();
      if (response.success) {
        setTransactions(response.data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error("Failed to fetch transactions", err);
      setTransactions([]);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

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
      <MiniHeader heading="Transactions" />

      {/* Balance Card */}
      <div className="py-4 max-w-6xl 2xl:max-w-7xl mx-auto">
        <motion.div
          className="m-2 p-2 mb-5 bg-white rounded-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex justify-between items-center p-3">
            <div>
              <h2 className="text-[10px] text-gray-500 opacity-90">
                Current Wallet Balance
              </h2>
              <p className="text-lg font-bold mt-1">
                ₹{walletBalance.toLocaleString()}
              </p>
            </div>
            <Link to="/wallet">
              <motion.button className="text-white bg-yellow-500 p-3 rounded flex items-center gap-2 font-medium text-xs shadow-md cursor-pointer">
                <FaPlus /> Add Money
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="px-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {transactions &&
            transactions.map((monthData, index) => (
              <motion.section
                key={index}
                className="mb-6"
                variants={itemVariants}
              >
                <h2 className="text-sm font-semibold mb-3 text-gray-700">
                  {monthData.month}
                </h2>
                <motion.ul className="divide-y divide-gray-200 rounded-lg bg-white shadow-sm">
                  {monthData.transactions.map((txn, idx) => (
                    <motion.li
                      key={idx}
                      className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer"
                      variants={itemVariants}
                    >
                      <div className="flex gap-3 items-center">
                        <TransactionIcon transactionType={txn.tr_type} />
                        <div>
                          <h3 className="font-medium text-sm text-gray-800">
                            {txn.title}
                          </h3>
                          <p className="text-[10px] text-gray-500">
                            {txn.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold text-sm ${
                            txn.amount < 0 ? "text-red-500" : "text-yellow-500"
                          }`}
                        >
                          {txn.amount < 0 ? "- " : "+ "}₹
                          {Math.abs(txn.amount).toLocaleString()}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.section>
            ))}

          {/* Empty State */}
          {transactions.length === 0 && (
            <motion.div
              className="bg-white rounded-xl p-6 flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FiFile className="w-8 h-8 text-gray-400" />
              </div>

              <h3 className="text-gray-800 font-medium">No Transactions Yet</h3>
              <p className="text-sm text-gray-500 mt-1">
                Your transaction history will appear here
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Transactions;
