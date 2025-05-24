import axios from "axios";
import config from "../config";

const API_URL = config.API_BASE_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
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

// Fetch Nearby Vendors
export const fetchNearbyVendors = async (latitude, longitude) => {
  console.log("object", latitude, longitude);
  try {
    const response = await api.get(
      `/vendor/nearby?latitude=${latitude}&longitude=${longitude}`
    );
    return response.data.data; // Return the list of nearby vendors
  } catch (error) {
    console.error("Error fetching nearby vendors:", error);
    return [];
  }
};

// Fetch Wallet Balance
export const fetchWalletBalance = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { balance: 0 };
    }

    const response = await api.get("/user/wallet-balance");
    return response.data.data; // Return wallet balance
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return { balance: 0 };
  }
};

// Fetch Food Stories
export const fetchFoodStories = async () => {
  try {
    const response = await api.get("/home/food-stories");
    return response.data.data; // Return food stories
  } catch (error) {
    console.error("Error fetching food stories:", error);
    return [];
  }
};

// Fetch Rewards
export const fetchRewards = async () => {
  try {
    const response = await api.get("/home/rewards");
    return response.data.data; // Return rewards
  } catch (error) {
    console.error("Error fetching rewards:", error);
    return [];
  }
};
