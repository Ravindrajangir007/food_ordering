import axios from "axios";
import config from "../config";

const API_URL = config.API_BASE_URL; // Base URL for your PHP API

// Axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 20000, // 20 seconds timeout
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

// Create scheduled order
export const createScheduledOrder = async (payload) => {
  try {
    const response = await api.post("/order/create-scheduled", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating scheduled order:", error);
    throw error;
  }
};
