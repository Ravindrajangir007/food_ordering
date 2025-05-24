import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiSmartphone, FiShield } from "react-icons/fi";
import { sendOTP, verifyOTP } from "../service/authService";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { useWallet } from "../context/WalletContext";

const Login = ({ onLoginSuccess }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const { reloadWalletBalance } = useWallet();

  // Timer Effect
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      onLoginSuccess({ token });
    }
  }, []);

  const handlePhoneSubmit = async () => {
    if (phone.length === 10) {
      try {
        setIsLoading(true);
        const response = await sendOTP(phone);
        if (response.success) {
          toast.success(response.message || "OTP sent successfully");
          setStep(2);
          setTimer(30);
        } else {
          toast.error(response.message || "Failed to send OTP");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send OTP");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 4) {
      toast.error("Please enter complete OTP");
      return;
    }

    try {
      setIsLoading(true);
      const response = await verifyOTP(phone, enteredOTP);

      if (response.success) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.message || "Login successful");
        await reloadWalletBalance();
        onLoginSuccess(response.data);
      } else {
        toast.error(response.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer === 0) {
      try {
        setIsLoading(true);
        const response = await sendOTP(phone);
        if (response.success) {
          toast.success("OTP resent successfully");
          setTimer(30);
        } else {
          toast.error(response.message || "Failed to resend OTP");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to resend OTP");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    // if (value && index === 3) {
    //   const completeOTP = newOtp.join("");
    //   if (completeOTP.length === 4) {
    //     handleVerifyOTP();
    //   }
    // }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-gray-200">
        {/* Left Content */}
        <div className="bg-yellow-600 text-white p-5 md:p-12 flex flex-col justify-center space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-6 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
              <FiSmartphone className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-lg md:text-4xl font-extrabold">
              Welcome to Kiyucart
            </h1>
            <p className="md:mt-4 text-sm md:text-lg font-light">
              Login to continue and enjoy your favorite meals!
            </p>
          </div>
        </div>

        {/* Right Login Form */}
        <div className={`p-4 md:p-10 ${step === 1 && "md:py-20"}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {step === 1 ? (
                <motion.div className="space-y-8" variants={containerVariants}>
                  {/* Phone Input */}
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <label className="text-sm font-medium text-gray-600 ml-1 flex items-center gap-2">
                      <FiSmartphone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center">
                        <span className="text-gray-500 font-medium text-sm">
                          +91
                        </span>
                      </div>
                      <input
                        type="tel"
                        maxLength="10"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        className="w-full pl-16 pr-5 py-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm transition-all duration-200"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </motion.div>

                  {/* Continue Button */}
                  <motion.button
                    onClick={handlePhoneSubmit}
                    disabled={phone.length !== 10 || isLoading}
                    className={`w-full py-4 rounded-xl text-lg font-medium transform transition-all duration-200  ${
                      phone.length === 10 && !isLoading
                        ? "hover:-translate-y-1 cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 text-white "
                        : "opacity-70 cursor-not-allowed bg-gray-200 text-black"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="flex items-center justify-center gap-2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    ) : (
                      "Continue"
                    )}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div className="space-y-4" variants={containerVariants}>
                  {/* Back Button */}
                  {/* <motion.button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                    whileHover={{ x: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiArrowLeft /> Back
                  </motion.button> */}

                  {/* OTP Section */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-2 justify-center mb-4">
                      <FiShield className="w-5 h-5 text-yellow-500" />
                      <p className="text-gray-600">Verification Code</p>
                    </div>
                    <p className="text-center text-gray-900 font-medium flex justify-center items-center gap-2">
                      +91 {phone}{" "}
                      <FaEdit
                        className="text-yellow-500"
                        onClick={() => setStep(1)}
                      />
                    </p>
                  </motion.div>

                  {/* OTP Input */}
                  <motion.div
                    className="flex justify-center gap-3"
                    variants={itemVariants}
                  >
                    {otp.map((digit, index) => (
                      <motion.input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-sm font-bold bg-white/80 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
                        whileFocus={{ scale: 1.05 }}
                      />
                    ))}
                  </motion.div>

                  {/* Timer & Resend */}
                  <motion.div className="text-center" variants={itemVariants}>
                    {timer > 0 ? (
                      <p className="text-gray-600">
                        Resend code in{" "}
                        <span className="text-yellow-600 font-medium">
                          {timer}s
                        </span>
                      </p>
                    ) : (
                      <motion.button
                        onClick={handleResendOTP}
                        disabled={isLoading}
                        className="text-yellow-600 font-medium hover:text-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Resend Code
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Verify Button */}
                  <motion.button
                    onClick={handleVerifyOTP}
                    disabled={otp.some((digit) => !digit) || isLoading}
                    className={`w-full py-4   rounded-xl text-lg font-medium transform transition-all duration-200  z-50 ${
                      !otp.some((digit) => !digit) && !isLoading
                        ? "hover:-translate-y-1 hover:shadow-xl cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                        : "opacity-70 cursor-not-allowed bg-gray-200 text-black"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    {isLoading ? (
                      <motion.div
                        className="flex items-center justify-center gap-2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    ) : (
                      "Verify & Continue"
                    )}
                  </motion.button>
                </motion.div>
              )}

              {/* Terms */}
              <motion.p
                className="mt-8 text-center text-xs text-gray-500"
                variants={itemVariants}
              >
                By continuing, you agree to our{" "}
                <motion.a
                  href="#"
                  className="text-yellow-600 hover:text-yellow-700"
                  whileHover={{ borderBottom: "1px solid" }}
                >
                  Terms
                </motion.a>{" "}
                and{" "}
                <motion.a
                  href="#"
                  className="text-yellow-600 hover:text-yellow-700"
                  whileHover={{ borderBottom: "1px solid" }}
                >
                  Privacy Policy
                </motion.a>
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;
