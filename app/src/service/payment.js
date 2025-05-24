import axios from "axios";
import config from "../config";

const API_URL = config.API_BASE_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const createRazorpayOrder = async (amount, receipt) => {
  try {
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("currency", "INR");
    formData.append("receipt", receipt);

    const response = await api.post("/razorpay/create-order", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};

export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await api.post("/razorpay/verify-payment", paymentData);
    return response.data;
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    throw error;
  }
};

export const fetchTransactions = async (type) => {
  try {
    let response;
    if (type !== undefined && type !== null) {
      response = await api.get(`/wallet/transactions?type=${type}`);
    } else {
      response = await api.get(`/wallet/transactions`);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to fetch transactions", error);
    throw error;
  }
};
