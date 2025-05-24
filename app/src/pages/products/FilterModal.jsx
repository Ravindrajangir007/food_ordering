import React, { useState } from "react";
import { motion } from "framer-motion";

const FilterModal = ({ isOpen, onClose, onApply }) => {
  const [activeTab, setActiveTab] = useState("Pricing");
  const [filters, setFilters] = useState({
    pricing: [],
    cuisines: [],
    dietaryPreference: [],
    spicyLevel: [],
    nutritionRating: [],
    sortBy: "",
  });

  const handleMultiSelect = (category, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[category];
      if (currentValues.includes(value)) {
        return {
          ...prevFilters,
          [category]: currentValues.filter((item) => item !== value),
        };
      } else {
        return {
          ...prevFilters,
          [category]: [...currentValues, value],
        };
      }
    });
  };

  const handleClearFilters = () => {
    setFilters({
      pricing: [],
      cuisines: [],
      dietaryPreference: [],
      spicyLevel: [],
      nutritionRating: [],
      sortBy: "",
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white w-full max-w-md rounded-t-3xl overflow-hidden shadow-lg"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={handleClearFilters}
            className="text-sm text-yellow-500 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="flex">
          {/* Left Tabs */}
          <div className="w-1/4 bg-gray-50 border-r border-gray-200 text-xs">
            {[
              "Sort By",
              "Pricing",
              "Cuisines",
              "Dietary Preference",
              "Spicy Level",
              "Nutrition by Rating",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-3 px-4 text-left text-xs font-medium ${
                  activeTab === tab
                    ? "bg-white text-yellow-500 border-r-4 border-yellow-500"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="w-3/4 p-2 space-y-4 bg-sky-50">
            {activeTab === "Sort By" && (
              <div>
                <h3 className="text-xs font-medium text-gray-700 mb-2">
                  Sort By
                </h3>
                <div className="space-y-2 ">
                  {[
                    "Relevance",
                    "Price: Low to High",
                    "Price: High to Low",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFilters({ ...filters, sortBy: option })}
                      className={`w-full py-2 px-3 rounded-lg text-left text-xs font-medium border ${
                        filters.sortBy === option
                          ? "bg-yellow-100 border-yellow-500 text-yellow-600"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "Pricing" && (
              <div>
                <h3 className="text-xs font-medium text-gray-700 mb-2">
                  Pricing
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Under ₹100",
                    "₹100 - ₹200",
                    "₹200 - ₹300",
                    "Above ₹300",
                  ].map((price) => (
                    <button
                      key={price}
                      onClick={() => handleMultiSelect("pricing", price)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border ${
                        filters.pricing.includes(price)
                          ? "bg-yellow-100 border-yellow-500 text-yellow-600"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Cuisines" && (
              <div>
                <h3 className="text-xs font-medium text-gray-700 mb-2">
                  Cuisines
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "North Indian",
                    "South Indian",
                    "Chinese",
                    "Continental",
                  ].map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => handleMultiSelect("cuisines", cuisine)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border ${
                        filters.cuisines.includes(cuisine)
                          ? "bg-yellow-100 border-yellow-500 text-yellow-600"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Dietary Preference" && (
              <div>
                <h3 className="text-xs font-medium text-gray-700 mb-2">
                  Dietary Preference
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Veg", "Non-Veg", "Vegan", "Gluten-Free", "Keto"].map(
                    (preference) => (
                      <button
                        key={preference}
                        onClick={() =>
                          handleMultiSelect("dietaryPreference", preference)
                        }
                        className={`py-2 px-3 rounded-lg text-xs font-medium border ${
                          filters.dietaryPreference.includes(preference)
                            ? "bg-yellow-100 border-yellow-500 text-yellow-600"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        {preference}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "Spicy Level" && (
              <div>
                <h3 className="text-xs font-medium text-gray-700 mb-2">
                  Spicy Level
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Mild", "Medium", "Spicy"].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleMultiSelect("spicyLevel", level)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border ${
                        filters.spicyLevel.includes(level)
                          ? "bg-yellow-100 border-yellow-500 text-yellow-600"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Nutrition by Rating" && (
              <div>
                <h3 className="text-xs font-medium text-gray-700 mb-2">
                  Nutrition by Rating
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Rated 3.5+", "Rated 4.0+"].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        handleMultiSelect("nutritionRating", rating)
                      }
                      className={`py-2 px-3 rounded-lg text-xs font-medium border ${
                        filters.nutritionRating.includes(rating)
                          ? "bg-yellow-100 border-yellow-500 text-yellow-600"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="py-2 px-4 text-xs font-medium text-gray-600"
          >
            Close
          </button>
          <button
            onClick={() => onApply(filters)}
            className="py-2 px-4 bg-yellow-500 text-white rounded-lg text-xs font-medium"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FilterModal;
