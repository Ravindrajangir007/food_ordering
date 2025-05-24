import axios from "axios";
import { config } from "../constant/global";
const API_URL = config.API_BASE_URL;

export const fetchCustomers = async (page = 1, limit = 10, filters = {}) => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      ...filters,
    });

    const response = await axios.get(`${API_URL}/customer/list?${params}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCustomerDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/customer/details?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateCustomerStatus = async (id, status) => {
  try {
    const response = await axios.post(
      `${API_URL}/customer/update-status?id=${id}`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCustomerOrders = async (customerId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}/customer/orders?id=${customerId}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
