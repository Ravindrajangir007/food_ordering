import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  sendOtp,
  verifyOtp,
  onboardVendor,
} from "../../Services/vendorOnboardingRequestService";

const PartnerWithUsForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
  });

  const [vendorId, setVendorId] = useState(null);

  // OTP states
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);

  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  // For geolocation (optional)
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLatitude(pos.coords.latitude);
          setCurrentLongitude(pos.coords.longitude);
        },
        () => {
          setCurrentLatitude(null);
          setCurrentLongitude(null);
        }
      );
    }
  }, []);

  const cities = [
    { label: "Delhi (We are Expanding)", value: "Delhi", status: false },
    { label: "Gurugram (Live Now)", value: "Gurugram", status: true },
    { label: "Noida (We are Expanding)", value: "Noida", status: false },
    { label: "Mumbai (We are Expanding)", value: "Mumbai", status: false },
    {
      label: "Bangalore (We are Expanding)",
      value: "Bangalore",
      status: false,
    },
    { label: "Chennai (We are Expanding)", value: "Chennai", status: false },
    {
      label: "Hyderabad (We are Expanding)",
      value: "Hyderabad",
      status: false,
    },
    { label: "Pune (We are Expanding)", value: "Pune", status: false },
    { label: "Kolkata (We are Expanding)", value: "Kolkata", status: false },
    {
      label: "Ahmedabad (We are Expanding)",
      value: "Ahmedabad",
      status: false,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Animation variants
  const otpVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { opacity: 1, height: "auto", overflow: "visible" },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // Email OTP handlers
  const sendEmailOtpHandler = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email before sending OTP.");
      return;
    }
    try {
      const res = await sendOtp("email", formData.email, null);
      if (res.vendor_id) setVendorId(res.vendor_id);
      setEmailOtpSent(true);
      setEmailOtp("");
      toast.success(res.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Failed to send email OTP"
      );
    }
  };

  const verifyEmailOtpHandler = async () => {
    if (emailOtp.length !== 4) {
      toast.error("Please enter a valid 4-digit email OTP.");
      return;
    }
    try {
      const res = await verifyOtp("email", formData.email, null, emailOtp);
      setEmailOtpVerified(true);
      toast.success(res.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Email OTP verification failed"
      );
    }
  };

  const resendEmailOtpHandler = async () => {
    try {
      const res = await sendOtp("email", formData.email, null);
      setEmailOtp("");
      toast.success(res.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to resend email OTP"
      );
    }
  };

  // Phone OTP handlers
  const sendPhoneOtpHandler = async () => {
    if (!formData.phone.match(/^\d{10}$/)) {
      toast.error(
        "Please enter a valid 10-digit phone number before sending OTP."
      );
      return;
    }
    try {
      const res = await sendOtp("phone", null, formData.phone);
      if (res.vendor_id) setVendorId(res.vendor_id);
      setPhoneOtpSent(true);
      setPhoneOtp("");
      toast.success(res.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Failed to send phone OTP"
      );
    }
  };

  const verifyPhoneOtpHandler = async () => {
    if (phoneOtp.length !== 4) {
      toast.error("Please enter a valid 4-digit phone OTP.");
      return;
    }
    try {
      const res = await verifyOtp("phone", null, formData.phone, phoneOtp);
      setPhoneOtpVerified(true);
      toast.success(res.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Phone OTP verification failed"
      );
    }
  };

  const resendPhoneOtpHandler = async () => {
    try {
      const res = await sendOtp("phone", null, formData.phone);
      setPhoneOtp("");
      toast.success(res.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to resend phone OTP"
      );
    }
  };

  // Edit handlers to allow input change after OTP sent
  const editEmailHandler = () => {
    setEmailOtpSent(false);
    setEmailOtp("");
    setEmailOtpVerified(false);
  };

  const editPhoneHandler = () => {
    setPhoneOtpSent(false);
    setPhoneOtp("");
    setPhoneOtpVerified(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneOtpVerified) {
      toast.error("Please verify your phone number before submitting.");
      return;
    }
    if (!emailOtpVerified) {
      toast.error("Please verify your email before submitting.");
      return;
    }

    try {
      const vendorData = {
        vendor_id: vendorId,
        business_name: formData.businessName,
        contact_person: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        latitude: currentLatitude,
        longitude: currentLongitude,
        email_verified: emailOtpVerified ? 1 : 0,
        phone_verified: phoneOtpVerified ? 1 : 0,
      };
      const res = await onboardVendor(vendorData);
      toast.success(res.message);
      // Reset form and states
      setFormData({
        businessName: "",
        contactPerson: "",
        email: "",
        phone: "",
        city: "",
      });
      setEmailOtp("");
      setPhoneOtp("");
      setEmailOtpSent(false);
      setPhoneOtpSent(false);
      setEmailOtpVerified(false);
      setPhoneOtpVerified(false);
      setVendorId(null);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Failed to onboard vendor"
      );
    }
  };

  return (
    <div className="bg-white/50 border-2 border-white py-6 px-3 md:px-8 rounded-xl space-y-7 shadow-lg form-container">
      <div className="folded-corner">
        <div className="folded-shadow "></div>
      </div>
      <h1 className="text-gray-800 text-2xl font-bold mb-6 text-center">
        Get Started
      </h1>
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
        {/* Business Name */}
        <div>
          <label
            htmlFor="businessName"
            className="text-gray-700 font-semibold mb-2 block"
          >
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter your business name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
            required
          />
        </div>

        {/* Contact Person */}
        <div>
          <label
            htmlFor="contactPerson"
            className="text-gray-700 font-semibold mb-2 block"
          >
            Contact Person
          </label>
          <input
            id="contactPerson"
            name="contactPerson"
            type="text"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Enter contact person name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-gray-700 font-semibold mb-2 flex items-center gap-2"
          >
            Email ID
            <AnimatePresence>
              {emailOtpVerified && (
                <motion.span
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={badgeVariants}
                  className="text-green-500 flex items-center gap-1 text-sm font-semibold select-none"
                >
                  <FaCheckCircle />
                  Verified
                </motion.span>
              )}
            </AnimatePresence>
          </label>
          <div className="flex gap-2 items-center ">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-5/6 flex-grow p-3 border border-gray-300 rounded-lg focus:outline-yellow-500 focus:ring-2 focus:ring-yellow-400 transition disabled:bg-gray-100"
              required
              disabled={emailOtpSent && !emailOtpVerified}
            />
            {!emailOtpSent && !emailOtpVerified && (
              <button
                type="button"
                onClick={sendEmailOtpHandler}
                className="w-1/6 text-xs text-nowrap bg-yellow-500 text-white px-3 md:px-5 py-4 rounded-lg font-semibold hover:bg-yellow-600 transition cursor-pointer min-w-[80px] text-center"
              >
                Send OTP
              </button>
            )}
            {emailOtpSent && !emailOtpVerified && (
              <button
                type="button"
                onClick={editEmailHandler}
                className="w-1/6 text-xs text-nowrap bg-yellow-500 text-white px-3 md:px-5 py-4 rounded-lg font-semibold hover:bg-yellow-600 transition cursor-pointer min-w-[80px] text-center"
              >
                Edit
              </button>
            )}
          </div>
          <AnimatePresence>
            {emailOtpSent && !emailOtpVerified && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={otpVariants}
                transition={{ duration: 0.3 }}
                className="mt-3 flex gap-3 items-center"
              >
                <input
                  type="text"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="Enter OTP"
                  maxLength={4}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-yellow-500 focus:ring-2 focus:ring-yellow-400 transition w-32"
                />
                <button
                  type="button"
                  onClick={verifyEmailOtpHandler}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition cursor-pointer"
                >
                  Verify
                </button>
                <button
                  type="button"
                  onClick={resendEmailOtpHandler}
                  className="text-sm underline text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Resend OTP
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="text-gray-700 font-semibold mb-2 flex items-center gap-2"
          >
            Phone Number
            <AnimatePresence>
              {phoneOtpVerified && (
                <motion.span
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={badgeVariants}
                  className="text-green-500 flex items-center gap-1 text-sm font-semibold select-none"
                >
                  <FaCheckCircle />
                  Verified
                </motion.span>
              )}
            </AnimatePresence>
          </label>
          <div className="flex gap-2 relative items-center">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              className="w-5/6 flex-grow p-3 border border-gray-300 rounded-lg focus:outline-yellow-500 focus:ring-2 focus:ring-yellow-400 transition disabled:bg-gray-100"
              required
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit phone number"
              disabled={phoneOtpSent && !phoneOtpVerified}
            />
            {!phoneOtpSent && !phoneOtpVerified && (
              <button
                type="button"
                onClick={sendPhoneOtpHandler}
                className="w-1/6 text-xs text-nowrap bg-yellow-500 text-white px-3 md:px-5 py-4 rounded-lg font-semibold hover:bg-yellow-600 transition cursor-pointer min-w-[80px] text-center"
              >
                Send OTP
              </button>
            )}
            {phoneOtpSent && !phoneOtpVerified && (
              <button
                type="button"
                onClick={editPhoneHandler}
                className="w-1/6 text-xs text-nowrap bg-yellow-500 text-white px-3 md:px-5 py-4 rounded-lg font-semibold hover:bg-yellow-600 transition cursor-pointer min-w-[80px] text-center"
              >
                Edit
              </button>
            )}
          </div>
          <AnimatePresence>
            {phoneOtpSent && !phoneOtpVerified && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={otpVariants}
                transition={{ duration: 0.3 }}
                className="mt-3 flex gap-3 items-center"
              >
                <input
                  type="text"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  placeholder="Enter OTP"
                  maxLength={4}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-yellow-500 focus:ring-2 focus:ring-yellow-400 transition w-32"
                />
                <button
                  type="button"
                  onClick={verifyPhoneOtpHandler}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition cursor-pointer"
                >
                  Verify
                </button>
                <button
                  type="button"
                  onClick={resendPhoneOtpHandler}
                  className="text-sm underline text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Resend OTP
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="text-gray-700 font-semibold mb-2 block"
          >
            City
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
            required
          >
            <option value="" disabled>
              Select your city
            </option>
            {cities.map((city, index) => (
              <option key={index} disabled={!city.status} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!phoneOtpVerified || !emailOtpVerified}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            phoneOtpVerified && emailOtpVerified
              ? "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PartnerWithUsForm;
