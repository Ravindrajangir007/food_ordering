// src/hooks/useCategories.js
import { useState, useEffect } from "react";
import CategoryService from "../services/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await CategoryService.getCategories(forceRefresh);
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refreshCategories: loadCategories };
};
