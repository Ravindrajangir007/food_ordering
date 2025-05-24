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
export const fetchVendorDetail = async (slug, lat, lng) => {
  try {
    const response = await api.get(
      `/vendor/detail?slug=${slug}&lat=${lat}&lng=${lng}`
    );
    return response.data.data; // Return the list of nearby vendors
  } catch (error) {
    console.error("Error fetching nearby vendors:", error);
    return [];
  }
};
