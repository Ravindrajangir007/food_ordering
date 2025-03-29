import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

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
  servingSize: {
    required: true,
    pattern: /^[0-9]+\s*[a-zA-Z]+$/,
    message: "Serving size should be in format like '200 g' or '2 pieces'",
  },
  calories: {
    required: true,
    min: 0,
    max: 2000,
    message: "Calories should be between 0 and 2000",
  },
  preparationTime: {
    required: true,
    min: 1,
    max: 180,
    message: "Preparation time should be between 1 and 180 minutes",
  },
  description: {
    required: true,
    maxLength: 200,
    message: "Description should not exceed 200 characters",
  },
  allergens: {
    pattern: /^[a-zA-Z\s,]*$/,
    message: "Allergens should be comma-separated words",
  },
};

const initialFormState = {
  name: "",
  price: "",
  servingSize: "",
  calories: "",
  preparationTime: "",
  description: "",
  isVeg: "true",
  allergens: "",
  available: true,
  category: "",
  spiceLevel: "medium",
};

const NewMenuModal = ({
  isOpen,
  day,
  onClose,
  onSubmit,
  mealType,
  menuItem = null,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (menuItem) {
      setFormData({
        name: menuItem.name || "",
        price: menuItem.price || "",
        servingSize: menuItem.servingSize || "",
        calories: menuItem.calories || "",
        preparationTime: menuItem.preparationTime || "",
        description: menuItem.description || "",
        isVeg: menuItem.isVeg?.toString() || "true",
        allergens: menuItem.allergens || "",
        available: menuItem.available ?? true,
        category: menuItem.category || "",
        spiceLevel: menuItem.spiceLevel || "medium",
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [menuItem, isOpen]);

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

    if (rules.max !== undefined && Number(value) > rules.max) {
      return rules.message;
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all fields
      const newErrors = {};
      Object.keys(VALIDATION_RULES).forEach((key) => {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Please fix the form errors");
        return;
      }

      const submissionData = {
        ...formData,
        mealType,
        day,
        price: parseFloat(formData.price),
        calories: parseInt(formData.calories),
        preparationTime: parseInt(formData.preparationTime),
        isVeg: formData.isVeg === "true",
        id: menuItem?.id,
        updatedAt: new Date().toISOString(),
        updatedBy: "Ravindrajangir007",
      };

      await onSubmit(submissionData);
      toast.success(
        menuItem
          ? "Menu item updated successfully"
          : "Menu item added successfully"
      );
      onClose();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="div" className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {menuItem
                        ? "Edit Menu Item"
                        : `Add New Menu Item in ${mealType}`}
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {menuItem
                      ? "Update the menu item details below"
                      : "Fill in the details for the new menu item"}
                  </p>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Item Name*
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter item name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.name}
                          </p>
                        )}
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Price (₹)*
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                              errors.price
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="0.00"
                          />
                          {errors.price && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.price}
                            </p>
                          )}
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Serving Size*
                          <input
                            type="text"
                            name="servingSize"
                            value={formData.servingSize}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                              errors.servingSize
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="e.g., 200 g"
                          />
                          {errors.servingSize && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.servingSize}
                            </p>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Calories*
                          <input
                            type="number"
                            name="calories"
                            value={formData.calories}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                              errors.calories
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter calories"
                          />
                          {errors.calories && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.calories}
                            </p>
                          )}
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Prep Time (mins)*
                          <input
                            type="number"
                            name="preparationTime"
                            value={formData.preparationTime}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                              errors.preparationTime
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter prep time"
                          />
                          {errors.preparationTime && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.preparationTime}
                            </p>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description*
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="2"
                          className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                            errors.description
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter item description"
                        />
                        {errors.description && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.description}
                          </p>
                        )}
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Type*
                          <select
                            name="isVeg"
                            value={formData.isVeg}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border p-2 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="true">Vegetarian</option>
                            <option value="false">Non-vegetarian</option>
                          </select>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Spice Level
                          <select
                            name="spiceLevel"
                            value={formData.spiceLevel}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border p-2 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="mild">Mild</option>
                            <option value="medium">Medium</option>
                            <option value="spicy">Spicy</option>
                          </select>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Allergens
                        <input
                          type="text"
                          name="allergens"
                          value={formData.allergens}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                            errors.allergens
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="e.g., nuts, dairy, gluten"
                        />
                        {errors.allergens && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.allergens}
                          </p>
                        )}
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <input
                          type="checkbox"
                          name="available"
                          checked={formData.available}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2"
                        />
                        Available for ordering
                      </label>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                      disabled={isSubmitting || Object.keys(errors).length > 0}
                    >
                      {isSubmitting
                        ? "Processing..."
                        : menuItem
                        ? "Update"
                        : "Add"}{" "}
                      Menu Item
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewMenuModal;
