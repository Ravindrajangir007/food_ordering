import axios from "axios";
import { config } from "../constant/global";

const API_URL = config.API_BASE_URL;

export const fetchSlots = async (categoryId = null) => {
  try {
    const params = new URLSearchParams();
    if (categoryId) {
      params.append("category_id", categoryId);
    }

    const response = await axios.get(
      `${API_URL}/delivery-slot/list?${params}`,
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

export const getSlotDetails = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/delivery-slot/details?id=${id}`,
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

export const createSlot = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/delivery-slot/create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateSlot = async (id, data) => {
  try {
    const response = await axios.post(
      `${API_URL}/delivery-slot/update?id=${id}`,
      data,
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

export const toggleSlotStatus = async (id) => {
  try {
    const response = await axios.post(
      `${API_URL}/delivery-slot/toggle-status?id=${id}`,
      {},
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
