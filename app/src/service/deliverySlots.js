import axios from "axios";
import config from "../config";

const API_URL = config.API_BASE_URL; // Base URL for your PHP API

// Axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 20000, // Increased timeout to 20 seconds
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
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchDeliverySlots = async (category) => {
  try {
    const response = await api.get(`/getSlotsByCategory?category=${category}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching trending dishes:", error);
    return [];
  }
};
