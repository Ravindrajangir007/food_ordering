import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FiCamera, FiList } from "react-icons/fi";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { config } from "../../constant/global";
import { useCategories } from "../../hooks/useCategories";

const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: "Name should be 3-50 characters and contain only letters",
  },
  price: {
    required: true,
    min: 0,
    message: "Price should be greater than 0",
  },
  description: {
    required: true,
    maxLength: 200,
    message: "Description should not exceed 200 characters",
  },
  category: {
    required: true,
    message: "Please select a category",
  },
  mainImage: {
    required: true,
    message: "Please upload a main image",
  },
};

const initialFormState = {
  name: "",
  price: "",
  description: "",
  isVeg: true,
  available: true,
  category: null,
  mainImage: null,
};

const ProductForm = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [initialData, setInitialData] = useState(null);

  console.log("initialData", initialData);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${config.API_BASE_URL}/product/details?id=${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
          },
        }
      );

      if (response.data.success) {
        const productData = response.data.data;
        setInitialData(productData);

        const transformedData = {
          name: productData.name || "",
          price: productData.price || "",
          description: productData.description || "",
          isVeg: Boolean(productData.is_veg),
          available: Boolean(productData.available),
          category: productData.category || null,
          mainImage: productData.main_image || null,
        };

        setFormData(transformedData);
        if (productData.main_image) {
          setImagePreview(config.IMAGE_URL + productData.main_image);
        }
      } else {
        throw new Error(
          response.data.message || "Failed to fetch product details"
        );
      }
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch product";
      toast.error(errorMessage);
      navigate("/products");
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = (name, value) => {
    const rules = VALIDATION_RULES[name];
    if (!rules) return "";

    if (rules.required && !value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return rules.message;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.message;
    }

    if (rules.min !== undefined && Number(value) < rules.min) {
      return rules.message;
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      if (name === "mainImage") {
        const file = files[0];
        if (file) {
          if (file.type.startsWith("image/")) {
            setFormData((prev) => ({
              ...prev,
              mainImage: file,
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
          } else {
            toast.error("Please upload an image file");
          }
        }
      }
      return;
    }

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    const error = validateField(name, newValue);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      category: selectedOption ? selectedOption.label : null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(VALIDATION_RULES).forEach((key) => {
      const rules = VALIDATION_RULES[key];
      const value = formData[key];

      if (rules.required && !value) {
        newErrors[key] = rules.message;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[key] = rules.message;
      }

      if (rules.minLength && value.length < rules.minLength) {
        newErrors[key] = rules.message;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        newErrors[key] = rules.message;
      }

      if (rules.min !== undefined && Number(value) < rules.min) {
        newErrors[key] = rules.message;
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Please fix all errors before submitting");
        return;
      }

      const formDataObj = new FormData();

      formDataObj.append("name", formData.name);
      formDataObj.append("price", formData.price);
      formDataObj.append("description", formData.description);
      formDataObj.append("isVeg", formData.isVeg ? "1" : "0");
      formDataObj.append("available", formData.available ? "1" : "0");
      formDataObj.append("category", formData.category);

      if (formData.mainImage instanceof File) {
        formDataObj.append("main_image", formData.mainImage);
      }

      let response;
      if (initialData?.id) {
        response = await axios.post(
          `${config.API_BASE_URL}/product/update?id=${initialData.id}`,
          formDataObj,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${config.API_BASE_URL}/product/create`,
          formDataObj,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.data.success) {
        toast.success(
          initialData
            ? "Product updated successfully"
            : "Product created successfully"
        );
        navigate("/products");
      } else {
        throw new Error(response.data.message || "Operation failed");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Operation failed";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6 flex justify-between items-center border-b pb-5 border-gray-300">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"
        >
          <FiList className="h-5 w-5 mr-2" />
          All Products
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Basic Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-xl border p-2.5 ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (₹)*
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-xl border p-2.5 ${
                errors.price ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-500">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`mt-1 block w-full rounded-xl border p-2.5 ${
                errors.description ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Describe your product..."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category*
            </label>
            {categoriesLoading ? (
              <div className="mt-1">Loading categories...</div>
            ) : categoriesError ? (
              <div className="mt-1 text-red-500">{categoriesError}</div>
            ) : (
              <Select
                name="category"
                options={categories}
                value={categories.find(
                  (option) => option.label === formData.category
                )}
                onChange={handleCategoryChange}
                className="mt-1"
                classNamePrefix="select"
                placeholder="Select a category..."
                noOptionsMessage={() => "No categories available"}
              />
            )}
          </div>

          <div className="flex justify-start items-center gap-10">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-yellow-600 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Available for ordering
                </span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isVeg"
                  checked={formData.isVeg}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-yellow-600 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Is Veg</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Images</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="flex-shrink-0 h-32 w-32 border-2 border-gray-300 border-dashed rounded-xl overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <FiCamera className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <input
                type="file"
                name="mainImage"
                onChange={handleChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-yellow-50 file:text-yellow-700
                  hover:file:bg-yellow-100 border rounded-lg border-gray-300 p-2 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center justify-end">
          {initialData && (
            <button
              type="button"
              onClick={() => {
                setFormData(initialFormState);
                setImagePreview(null);
              }}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Processing...
              </span>
            ) : (
              <span>{initialData ? "Update" : "Add"} Product</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
