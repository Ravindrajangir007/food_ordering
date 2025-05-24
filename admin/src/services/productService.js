import axios from "axios";
import { config } from "../constant/global";

const API_URL = config.API_BASE_URL;

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.post(
      `${API_URL}/product/delete?id=${id}`,
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

// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/product/add`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(
      `${API_URL}/product/update?id=${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
