import axios from "axios";
import { config } from "../constant/global";

const API_URL = config.API_BASE_URL;

export const fetchPaymentDashboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/payment/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
