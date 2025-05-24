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

export const fetchDeliverySchedules = async () => {
  try {
    const response = await api.get(`/customer/schedule-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trending dishes:", error);
    return [];
  }
};

export const toggleDeliveryDaySchedule = async (scheduleId, dayId) => {
  try {
    const formData = new FormData();
    formData.append("scheduleId", scheduleId);
    formData.append("dayId", dayId);
    const response = await api.post(
      `/order/toggleDeliveryDaySchedule`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling pause/play:", error);
    throw error;
  }
};

export const toggleDeliverySchedule = async (scheduleId) => {
  try {
    const formData = new FormData();
    formData.append("scheduleId", scheduleId);
    const response = await api.post(`/order/toggleDeliverySchedule`, formData);
    return response.data;
  } catch (error) {
    console.error("Error toggling pause/play:", error);
    throw error;
  }
};

export const deleteDeliverySchedule = async (scheduleId) => {
  try {
    const formData = new FormData();
    formData.append("scheduleId", scheduleId);
    const response = await api.post(`/order/deleteDeliverySchedule`, formData);
    return response.data;
  } catch (error) {
    console.error("Error toggling pause/play:", error);
    throw error;
  }
};
