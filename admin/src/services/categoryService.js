// src/services/categoryService.js
import axios from "axios";
import { config } from "../constant/global";

class CategoryService {
  static categories = null;
  static loading = false;
  static error = null;

  static async getCategories(forceRefresh = false) {
    try {
      // Return cached categories if available and no force refresh
      if (this.categories && !forceRefresh) {
        return this.categories;
      }

      this.loading = true;
      this.error = null;

      const response = await axios.get(`${config.API_BASE_URL}/category/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
        },
      });

      if (response.data.success) {
        // Transform API data to select options format
        this.categories = response.data.data.map((category) => ({
          value: category.id,
          label: category.name,
          icon: category.icon,
          slug: category.slug,
        }));
        return this.categories;
      } else {
        throw new Error(response.data.message || "Failed to fetch categories");
      }
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  static async getCategoryById(id) {
    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
          },
        }
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to fetch category");
      }
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService;
