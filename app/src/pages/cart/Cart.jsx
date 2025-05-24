import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaClock, FaWallet } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AddressModal from "./AddressModal";
import AddAddressModal from "./AddAddressModal";
import DeliverySlotModal from "./DeliverySlotModal";
import CheckoutModal from "./CheckoutModal";
import InvoiceDetails from "./InvoiceDetails";
import { useCart } from "../../context/CartContext";
import config from "../../config";
import AddToCart from "../../comon/AddToCart";

import { MdClose } from "react-icons/md";
import { useWallet } from "../../context/WalletContext";
import MiniHeader from "../../Header/MiniHeader";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { addToCart, cart, totalQuantity } = useCart();
  const { walletBalance } = useWallet();
  // States
  const customer_token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");

  const [selectedAddress, setSelectedAddress] = useState(() => {
    const saved = localStorage.getItem("selected_address");
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedSlot, setSelectedSlot] = useState(() => {
    const saved = localStorage.getItem("selected_slots");
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedDays, setSelectedDays] = useState(() => {
    const saved = localStorage.getItem("selected_days");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem("selected_address", JSON.stringify(selectedAddress));
    } else {
      localStorage.removeItem("selected_address");
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (selectedSlot) {
      localStorage.setItem("selected_slots", JSON.stringify(selectedSlot));
    } else {
      localStorage.removeItem("selected_slots");
    }
  }, [selectedSlot]);

  useEffect(() => {
    if (selectedDays && selectedDays.length > 0) {
      localStorage.setItem("selected_days", JSON.stringify(selectedDays));
    } else {
      localStorage.removeItem("selected_days");
    }
  }, [selectedDays]);

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Modal states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;

  const total = subtotal - discount;
  const isBalanceSufficient = walletBalance >= total;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  // Handle checkout process
  const handleProceed = () => {
    if (!isBalanceSufficient) {
      navigate("/wallet");
      return;
    }

    if (!selectedAddress) {
      setShowAddressModal(true);
      return;
    }

    if (!selectedSlot) {
      setShowSlotModal(true);
      return;
    }

    setShowCheckoutModal(true);
  };

  const handleEditAddress = () => {
    setShowSlotModal(false);
    setShowCheckoutModal(false);
    setShowAddressModal(true);
  };

  const handleEditSchedule = () => {
    setShowCheckoutModal(false);
    setShowSlotModal(true);
  };

  return (
    <>
      <motion.div
        className="min-h-screen bg-sky-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}

        <MiniHeader heading="Cart" />
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-1 py-2 pb-20 ${
              cart.length === 0 ? "md:grid-cols-1" : "md:grid-cols-2"
            }`}
          >
            {/* Cart Content */}
            <div className="p-2 space-y-2 pb-30 md:pb-2">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-xl">
                  <img
                    src="/icons/empty-cart.png"
                    alt="Empty Cart"
                    className="w-32 h-32 mb-4"
                  />{" "}
                  {/* Replace with your image path */}
                  <h2 className="text-sm font-semibold text-yellow-700 mb-2">
                    Your Cart is Empty
                  </h2>
                  <p className="text-gray-500 text-xs">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <Link
                    to="/"
                    className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-300"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl overflow-hidden"
                  >
                    <div className="divide-y divide-gray-100">
                      {cart &&
                        cart.map((item, index) => {
                          const cartItem = cart.find(
                            (cartItem) => cartItem.id === item.id
                          );
                          const quantity = cartItem ? cartItem.quantity : 0;
                          return (
                            <motion.div
                              key={item.id}
                              variants={itemVariants}
                              className="p-4 flex items-center gap-4"
                            >
                              <div className="w-10 h-10 rounded-xl overflow-hidden">
                                <img
                                  src={config.IMAGE_URL + item.mainImage}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-sm">
                                  {item.name}
                                </h3>
                                <p className="text-gray-500 text-[10px]">
                                  {item.description}
                                </p>
                                <p className="text-yellow-600 text-sm">
                                  {config.CURRENCY + item.price * item.quantity}
                                </p>
                              </div>
                              <AddToCart
                                item={item}
                                quantity={quantity}
                                onAddToCart={() =>
                                  addToCart({ ...item, quantity: +1 })
                                }
                                onRemoveFromCart={() =>
                                  addToCart({ ...item, quantity: -1 })
                                }
                              />
                            </motion.div>
                          );
                        })}
                    </div>
                  </motion.div>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl overflow-hidden"
                  >
                    <InvoiceDetails
                      subtotal={subtotal}
                      appliedCoupon={appliedCoupon}
                      total={total}
                      expend
                    />
                  </motion.div>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl overflow-hidden p-4"
                  >
                    <h1 className="text-xs text-gray-900 font-medium">
                      Cancellation Policy
                    </h1>
                    <p className="text-[10px] text-gray-500 mt-2">
                      An Order once placed cannot be canceled in case or
                      operational challenges, your order might get cancelled at
                      our end. Any refund, if applicable, will be issued to your
                      wallet
                    </p>
                  </motion.div>
                </>
              )}
            </div>

            <motion.div
              className="fixed md:relative left-0 right-0 bottom-0 bg-white  border-gray-100 rounded-2xl md:m-2 overflow-hidden"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
            >
              <AnimatePresence>
                {!isBalanceSufficient && (
                  <motion.div
                    className="bg-red-50 border-b border-red-100 p-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <p className="text-center text-sm text-red-600">
                      Insufficient wallet balance. Add ₹
                      {(total - walletBalance).toFixed(2)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              {cart.length > 0 && (
                <div className="p-4">
                  {/* Wallet Balance and Button */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-xl font-semibold">
                        ₹{total.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Wallet Balance</p>
                      <p className="text-xl font-semibold text-yellow-600">
                        ₹{walletBalance}
                      </p>
                    </div>
                  </div>
                  {selectedAddress && (
                    <div className="mb-4">
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className="p-2 rounded-xl bg-yellow-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <p className="text-xs text-gray-700 mt-1">
                                {selectedAddress?.address_type}
                                {" - "}
                                {selectedAddress?.fullAddress}
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <button
                              className="h-4 w-4 flex justify-center items-center bg-red-400 rounded-full text-xs cursor-pointer text-white"
                              onClick={() => {
                                localStorage.removeItem("selected_address");
                                setSelectedAddress(null);
                              }}
                            >
                              <MdClose />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleProceed}
                    className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {!isBalanceSufficient ? (
                      <>
                        <FaWallet className="w-5 h-5" />
                        Add Funds
                      </>
                    ) : !selectedAddress ? (
                      <>
                        <FaMapMarkerAlt className="w-5 h-5" />
                        Select Delivery Address
                      </>
                    ) : !selectedSlot ? (
                      <>
                        <FaClock className="w-5 h-5" />
                        Select Delivery Slot
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-5 h-5" />
                        Proceed to Checkout
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </motion.div>
            {/* Modals */}
            <AnimatePresence>
              {showAddressModal && (
                <AddressModal
                  onClose={() => setShowAddressModal(false)}
                  onAddNew={() => {
                    setShowAddressModal(false);
                    setShowAddAddressModal(true);
                  }}
                  onSelect={(address) => {
                    setSelectedAddress(address);
                    setShowAddressModal(false);
                    setShowSlotModal(true);
                  }}
                  customer_token={customer_token}
                />
              )}

              {showAddAddressModal && (
                <AddAddressModal
                  onClose={() => setShowAddAddressModal(false)}
                  onSave={(address) => {
                    setSelectedAddress(address);
                    setShowAddAddressModal(false);
                    setShowSlotModal(true);
                  }}
                  customer_token={customer_token}
                />
              )}

              {showSlotModal && (
                <DeliverySlotModal
                  onClose={() => setShowSlotModal(false)}
                  onSelect={(slot, selectedDays) => {
                    setShowSlotModal(false);
                    setSelectedSlot(slot);
                    setSelectedDays(selectedDays);
                    setShowCheckoutModal(true);
                  }}
                  onEditAddress={handleEditAddress}
                />
              )}

              {showCheckoutModal && (
                <CheckoutModal
                  onClose={() => setShowCheckoutModal(false)}
                  cartItems={cart}
                  selectedAddress={selectedAddress}
                  selectedDays={selectedDays}
                  selectedSlot={selectedSlot}
                  total={total}
                  walletBalance={walletBalance}
                  onEditAddress={handleEditAddress}
                  onEditSchedule={handleEditSchedule}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Bar */}
      </motion.div>
    </>
  );
};

export default Cart;
