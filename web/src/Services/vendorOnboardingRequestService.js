import axios from "axios";
import config from "../Config";

const API_URL = config.API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Send OTP to email or phone
export const sendOtp = async (type, email, phone) => {
  try {
    const response = await api.post("/vendor/otp/send", { type, email, phone });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

// Verify OTP for email or phone (no vendor_id needed)
export const verifyOtp = async (type, email, phone, otp) => {
  try {
    const response = await api.post("/vendor/otp/verify", {
      type,
      email,
      phone,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

// Onboard vendor with full data
export const onboardVendor = async (vendorData) => {
  try {
    const response = await api.post("/vendor/onboard", vendorData);
    return response.data;
  } catch (error) {
    console.error("Error onboarding vendor:", error);
    throw error;
  }
};
