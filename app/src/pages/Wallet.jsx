import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { createRazorpayOrder, verifyRazorpayPayment } from "../service/payment";
import { useWallet } from "../context/WalletContext";
import { MdClose, MdDiscount } from "react-icons/md";
import MiniHeader from "../Header/MiniHeader";

const cashbackSlabs = [
  { min: 1500, max: 2999, cashback: 100 },
  { min: 3000, max: 5999, cashback: 210 },
  { min: 6000, max: 11999, cashback: 300 },
  { min: 12000, max: Infinity, cashback: 600 },
];

const Wallet = () => {
  const navigate = useNavigate();
  const { walletBalance, reloadWalletBalance } = useWallet();
  const [addAmount, setAddAmount] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [appliedSlab, setAppliedSlab] = useState({});
  const [appliedCashback, setAppliedCashback] = useState(0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const parsedValue = value.replace(/\D/g, "");
    setAddAmount(parsedValue ? parseInt(parsedValue, 10) : "");
    setAppliedCashback(0); // reset cashback on manual input change
  };

  const applySlab = (slab) => {
    if (!addAmount || addAmount < slab.min) {
      setAddAmount(slab.min);
    }
    setAppliedSlab(slab);
    setAppliedCashback(slab.cashback);
  };

  const initiateRazorpayPayment = async () => {
    if (!addAmount || addAmount < 10) return;
    if (isProcessingPayment) return;

    setIsProcessingPayment(true);

    try {
      const receipt = `wallet_recharge_${Date.now()}`;
      const orderResponse = await createRazorpayOrder(
        Math.round(addAmount * 100),
        receipt
      );

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || "Failed to create order");
      }

      const { id: orderId, amount, currency } = orderResponse.order;

      const options = {
        key: "rzp_test_7HoOBS54b4K5fx",
        amount,
        currency,
        name: "Kiyucart",
        description: "Wallet Recharge",
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyResponse = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: addAmount,
            });

            if (verifyResponse.success) {
              await reloadWalletBalance();
              setAddAmount("");
              setAppliedCashback(0);
              navigate("/wallet");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            alert("Payment verification failed. Please contact support.");
            console.error(err);
          } finally {
            setIsProcessingPayment(false);
          }
        },
        prefill: {},
        theme: { color: "#00c951" },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message || "Payment failed");
      setIsProcessingPayment(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-sky-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <MiniHeader
        heading="Wallet"
        right={
          <>
            <div className="text-right">
              <h2 className="text-[10px] text-gray-500 opacity-90">
                Wallet Balance
              </h2>
              <p className="text-sm font-bold mt-1">
                ₹{walletBalance.toLocaleString()}
              </p>
            </div>
          </>
        }
      />

      <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Add Funds */}
        <motion.div className="p-2 mx-2 md:mx-0 py-4 pb-30 2xl:pb-4 bg-white rounded-lg mt-4 ">
          <h2 className="text-sm font-semibold mb-2">Topup Your Wallet</h2>
          <div className="flex flex-col items-start gap-3">
            <div className="relative w-full flex items-center">
              <span className="absolute left-3 text-gray-500 flex items-center h-full pointer-events-none">
                ₹
              </span>
              <input
                type="text"
                value={addAmount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
              />
              {appliedCashback > 0 && (
                <div className="absolute right-2 uppercase bg-gradient-to-r from-yellow-500 to-yellow-700 text-white text-[9px] px-2 leading-3 py-1 rounded flex justify-center items-center h-6 top-1/2 transform -translate-y-1/2">
                  Flat ₹{appliedCashback} Cashback
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-2 w-full">
              {[1000, 2000, 4000, 6000].map((amount, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 text-xs border border-gray-300 rounded-full transition-all cursor-pointer ${
                    parseInt(addAmount) === amount
                      ? "border-yellow-500 bg-yellow-50 text-yellow-500"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setAddAmount(amount),
                      setAppliedCashback(0),
                      setAppliedSlab({});
                  }}
                >
                  ₹{amount}
                </button>
              ))}
            </div>

            {/* Slabs List */}
            <div className="w-full mt-2 space-y-2">
              {appliedSlab.min && (
                <div className="flex justify-between items-center border border-dashed border-yellow-500 rounded-lg px-4 py-2 mb-8 relative overflow-hidden">
                  <div className="bg-yellow-500 w-20 h-20 rounded-full absolute -top-3.5 -left-6">
                    <MdDiscount className="text-white absolute right-3 top-7 text-3xl" />
                  </div>
                  <div className="pl-12">
                    <p className="text-sm text-gray-900">
                      ₹{appliedSlab.min} Offer
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Cashback ₹{appliedSlab.cashback}
                    </p>
                  </div>
                  <button
                    className="font-semibold text-xs cursor-pointer bg-red-400 w-5 h-5 rounded-full flex justify-center items-center text-white"
                    onClick={() => {
                      setAppliedCashback(0);
                      setAppliedSlab({});
                    }}
                  >
                    <MdClose />
                  </button>
                </div>
              )}
              {cashbackSlabs
                .filter(
                  (slab) => !appliedSlab.min || slab.min !== appliedSlab.min
                )
                .map((slab, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <div>
                      <p className="text-sm text-gray-900">₹{slab.min} Offer</p>
                      <p className="text-[10px] text-gray-500">
                        Cashback ₹{slab.cashback}
                      </p>
                    </div>
                    <button
                      className="text-yellow-600 font-semibold text-xs cursor-pointer"
                      onClick={() => applySlab(slab)}
                    >
                      Apply
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Pay Button */}
      </div>
      <motion.div className="fixed bottom-0 left-0 right-0 w-full p-4 bg-white shadow-lg rounded-t-xl max-w-6xl 2xl:max-w-7xl mx-auto">
        <button
          className={`w-full py-3 text-lg font-medium rounded-lg transition-all ${
            addAmount >= 10
              ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-white hover:shadow-lg  cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={initiateRazorpayPayment}
          disabled={addAmount < 10 || isProcessingPayment}
        >
          {isProcessingPayment ? "Processing..." : `Pay ₹${addAmount || 0}`}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Wallet;
