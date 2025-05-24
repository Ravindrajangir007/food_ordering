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

// Add a new service request
export const addServiceRequest = async (serviceRequestData, formName) => {
  try {
    const formData = new FormData();
    formData.append("serviceType", formName);
    formData.append("restaurantName", serviceRequestData.restaurantName);
    formData.append("mobileNo", serviceRequestData.mobileNo);
    formData.append("email", serviceRequestData.email);
    formData.append("city", serviceRequestData.city);
    formData.append("message", serviceRequestData.message);
    const response = await api.post("/service-request", formData);
    return response.data;
  } catch (error) {
    console.error("Error adding service request:", error);
    throw error;
  }
};
