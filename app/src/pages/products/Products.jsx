import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiShoppingCart,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";
import { motion } from "framer-motion";
import FilterModal from "./FilterModal";

const categories = [
  { name: "Breakfast", icon: "☕" }, // Coffee icon for breakfast
  { name: "Lunch", icon: "🍜" }, // Noodles icon for lunch
  { name: "Snacks", icon: "🍕" }, // Pizza slice icon for snacks
  { name: "Dinner", icon: "🍽️" }, // Dinner plate icon for dinner
  { name: "Desserts", icon: "🧁" }, // Cupcake icon for desserts
];

const products = [
  {
    id: 1,
    name: "North Indian Thali",
    image: "/icons/thali.avif",
    description: "Dal, Rice, 4 Roti, 2 Sabji, Salad, Papad",
    price: 149,
    isVeg: true,
    rating: 4.5,
    reviews: 128,
    nutrition: [
      { name: "Calories", value: 320, unit: "Kcl" },
      { name: "Protein", value: 12, unit: "grams" },
      { name: "Fat", value: 8, unit: "grams" },
      { name: "Carbs", value: 45, unit: "grams" },
      { name: "Sugar", value: 5, unit: "grams" },
    ],
    dietaryTags: ["High Protein", "Low Fat", "Balanced Meal"],
  },
  {
    id: 2,
    name: "North Indian Thali",
    image: "/icons/thali.avif",
    description: "Dal, Rice, 4 Roti, 2 Sabji, Salad, Papad",
    price: 149,
    isVeg: true,
    rating: 4.5,
    reviews: 128,
    nutrition: [
      { name: "Calories", value: 320, unit: "Kcl" },
      { name: "Protein", value: 12, unit: "grams" },
      { name: "Fat", value: 8, unit: "grams" },
      { name: "Carbs", value: 45, unit: "grams" },
      { name: "Sugar", value: 5, unit: "grams" },
    ],
    dietaryTags: ["High Protein", "Low Fat", "Balanced Meal"],
  },
  // ... other products
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("Lunch");
  const [cart, setCart] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleApplyFilters = (filters) => {
    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value !== "all")
      .map(([key, value]) => ({ key, value }));
    setAppliedFilters(activeFilters);
    setIsFilterModalOpen(false);
  };

  const handleRemoveFilter = (filterKey) => {
    setAppliedFilters(
      appliedFilters.filter((filter) => filter.key !== filterKey)
    );
  };

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">
        <div className="max-w-md mx-auto px-2 py-6">
          <div className="flex items-center gap-3">
            <Link to="/">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
              >
                <FiArrowLeft className="text-white" />
              </motion.div>
            </Link>
            <h1 className="text-2xl font-semibold">Explore Menu</h1>
          </div>
          <p className="mt-2 text-sm text-white/80">
            Choose your favorite meal and enjoy delicious food!
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="p-2">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex-shrink-0 w-24 h-28 rounded-xl shadow-md cursor-pointer flex flex-col items-center justify-center gap-2 ${
                selectedCategory === category.name
                  ? "bg-yellow-100 border-2 border-yellow-500"
                  : "bg-white"
              }`}
            >
              {/* <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12"
              /> */}
              <div className="text-4xl">{category.icon}</div>
              <span
                className={`text-sm font-medium ${
                  selectedCategory === category.name
                    ? "text-yellow-600"
                    : "text-gray-700"
                }`}
              >
                {category.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="px-2 py-2">
        {/* Filter Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFilterModalOpen(true)}
          className="py-2 px-3 bg-white rounded-xl border border-gray-300 flex items-center justify-between mb-2"
        >
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-600" />
            <span className="text-sm font-medium">Filters</span>
            <FiChevronDown />
          </div>
        </motion.button>

        {/* Applied Filters */}
        {appliedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {appliedFilters
              .filter((filter) => filter.value && filter.value.length > 0) // Filter out blank filters
              .map((filter) => (
                <div
                  key={filter.key}
                  className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium"
                >
                  <span>{filter.value}</span>
                  <button
                    onClick={() => handleRemoveFilter(filter.key)}
                    className="w-4 h-4 flex items-center justify-center rounded-full bg-yellow-200 hover:bg-yellow-300"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Products */}
      <div className="px-2 py-2">
        <h2 className="text-lg font-medium mb-3">Available Meals</h2>
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <Link to="/product">
              <motion.div
                key={product.id}
                // whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-sm font-medium">
                    {product.isVeg ? "🥦 Veg" : "🍖 Non-Veg"}
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute bottom-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                    <span>★</span>
                    <span>{product.rating}</span>
                    <span className="text-xs">({product.reviews})</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.description}
                  </p>
                  {/* Nutritional Values */}
                  <div className="mt-3 rounded-xl">
                    <div className="grid grid-cols-5 gap-2">
                      {product?.nutrition.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center bg-sky-50 py-3 gap-0.5 rounded-xl"
                        >
                          <span className="text-[10px] text-gray-800 font-bold">
                            {item.name}
                          </span>
                          <span className="text-sm font-semibold text-gray-700">
                            {item.value}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {item.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                      High Protein
                    </span>
                    <span className="px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium">
                      Low Fat
                    </span>
                    <span className="px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium">
                      Balanced Meal
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-yellow-600">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-400 ml-2">
                        per serving
                      </span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium"
                    >
                      Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-4 z-20"
        >
          <div className="max-w-md mx-auto flex items-center justify-between">
            <span className="text-sm font-medium">
              {cart.length} items in cart
            </span>
            <Link to="/cart">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-yellow-600 rounded-lg text-sm font-medium flex justify-center items-center"
              >
                <FiShoppingCart className="mr-2" />
                View Cart
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default Products;
