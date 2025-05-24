import axios from "axios";
import { config } from "../constant/global";

const API_URL = config.API_BASE_URL;

export const fetchOrders = async (page = 1, limit = 10, filters = {}) => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      ...filters,
    });

    const response = await axios.get(`${API_URL}/order/list?${params}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOrderDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/order/details?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateOrderStatus = async (id, status, notes = null) => {
  try {
    const response = await axios.post(
      `${API_URL}/order/update-status?id=${id}`,
      {
        status,
        notes,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createScheduledOrders = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/order/create-scheduled`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
