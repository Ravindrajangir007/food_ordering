import axios from "axios";
import { config } from "../constant/global";

const API_URL = config.API_BASE_URL;

export const fetchCaptains = async () => {
  try {
    const response = await axios.get(`${API_URL}/delivery-captain/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCaptainDetails = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/delivery-captain/details?id=${id}`,
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

export const createCaptain = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/delivery-captain/create`,
      data,
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

export const updateCaptain = async (id, data) => {
  try {
    const response = await axios.post(
      `${API_URL}/delivery-captain/update?id=${id}`,
      data,
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
