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

// Add a new job post (restaurant + jobs)
export const addJobPost = async (jobPostData) => {
  try {
    const response = await api.post("/job-post", jobPostData);
    return response.data;
  } catch (error) {
    console.error("Error adding job post:", error);
    throw error;
  }
};
