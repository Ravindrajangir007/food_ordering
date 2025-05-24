import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { fetchProducts, deleteProduct } from "../../services/productService";
import { useCategories } from "../../hooks/useCategories";
import { config, NonVegMark, VegMark } from "../../constant/global";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch categories using a custom hook
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchProducts();

      if (response.success) {
        const transformedProducts = response.data.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          price: parseFloat(product.price),
          available: product.available,
          isVeg: product.is_veg,
          mainImage: product.main_image || "/default-product.jpg",
        }));

        setProducts(transformedProducts);
      } else {
        throw new Error(response.message || "Failed to fetch products");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch products";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
      }

      const response = await deleteProduct(id);

      if (response.success) {
        toast.success("Product deleted successfully");
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } else {
        throw new Error(response.message || "Failed to delete product");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete product";
      toast.error(errorMessage);
    }
  };

  // Filter products based on search query, availability, type, and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesAvailability =
      availabilityFilter === "All" ||
      (availabilityFilter === "Available" && product.available === 1) ||
      (availabilityFilter === "Unavailable" && product.available === 0);

    const matchesType =
      typeFilter === "All" ||
      (typeFilter === "Veg" && product.isVeg === 1) ||
      (typeFilter === "Non-Veg" && product.isVeg === 0);

    const matchesCategory =
      selectedCategory === "All" ||
      (product?.category && product?.category === selectedCategory);

    return (
      matchesSearch && matchesAvailability && matchesType && matchesCategory
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <button
          onClick={fetchAllProducts}
          className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            Products ({products.length})
          </h1>
          <Link to="/product">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"
            >
              <FiPlus className="h-5 w-5 mr-2" />
              Add Product
            </motion.button>
          </Link>
        </div>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Availability Filter */}
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="All">All</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Tile Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-4"
          >
            <img
              src={config.IMAGE_URL + product.mainImage}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                {product.name}
              </h2>
              {product.isVeg === 1 ? <VegMark /> : <NonVegMark />}
            </div>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-sm text-gray-600">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Availability:</strong>{" "}
              {product.available === 1 ? "Available" : "Unavailable"}
            </p>
            <div className="flex gap-2">
              <Link
                to={`/product/${product.id}`}
                className="px-3 py-2 rounded-lg bg-yellow-500 text-white text-sm hover:bg-yellow-600"
              >
                <FiEdit2 />
              </Link>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductList;
