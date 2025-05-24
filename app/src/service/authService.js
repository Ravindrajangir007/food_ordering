import axios from "axios";
import config from "../config";

const API_URL = config.API_BASE_URL;

export const sendOTP = async (mobile) => {
  try {
    const response = await axios.post(`${API_URL}/customer/send-otp`, {
      mobile,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyOTP = async (mobile, otp) => {
  try {
    const response = await axios.post(`${API_URL}/customer/verify-otp`, {
      mobile,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
