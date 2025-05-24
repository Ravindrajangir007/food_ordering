import axios from "axios";
import config from "../config";

const API_URL = config.API_BASE_URL;

// Fetch product details by ID
export const fetchProductDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/product/details`, {
      params: { id },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch reviews for a product
export const fetchProductReviews = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}/reviews`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add a review for a product
export const addProductReview = async (id, review) => {
  try {
    const response = await axios.post(
      `${API_URL}/products/${id}/reviews`,
      review
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
