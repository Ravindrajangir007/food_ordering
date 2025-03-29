import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import Select from "react-select";

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
  calories: {
    required: true,
    min: 0,
    max: 2000,
    message: "Calories should be between 0 and 2000",
  },
  description: {
    required: true,
    maxLength: 200,
    message: "Description should not exceed 200 characters",
  },
};

const initialFormState = {
  name: "",
  price: "",
  calories: "",
  description: "",
  isVeg: "true",
  available: true,
  category: [],
  images: [],
  mainImage: "",
  items: [],
  totalCalories: 0,
};

const initialItemState = {
  name: "",
  servingSize: "",
  calories: "",
};

const categoryOptions = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snacks", label: "Snacks" },
  { value: "health-conscious", label: "Health-Conscious" },
];

const ProductForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [itemData, setItemData] = useState(initialItemState);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialFormState,
        ...initialData,
        category: initialData.category || [],
        items: initialData.items || [],
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [initialData, isOpen]);

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

  const handleCategoryChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      category: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addItem = () => {
    const newItems = [
      ...formData.items,
      { ...itemData, calories: Number(itemData.calories) },
    ];
    const totalCalories = newItems.reduce(
      (sum, item) => sum + item.calories,
      0
    );

    setFormData((prev) => ({
      ...prev,
      items: newItems,
      totalCalories,
    }));

    setItemData(initialItemState);
  };

  const updateItem = () => {
    const newItems = formData.items.map((item, index) =>
      index === currentItemIndex
        ? { ...itemData, calories: Number(itemData.calories) }
        : item
    );
    const totalCalories = newItems.reduce(
      (sum, item) => sum + item.calories,
      0
    );

    setFormData((prev) => ({
      ...prev,
      items: newItems,
      totalCalories,
    }));

    setItemData(initialItemState);
    setCurrentItemIndex(null);
  };

  const editItem = (index) => {
    setItemData(formData.items[index]);
    setCurrentItemIndex(index);
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    const totalCalories = newItems.reduce(
      (sum, item) => sum + item.calories,
      0
    );

    setFormData((prev) => ({
      ...prev,
      items: newItems,
      totalCalories,
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
        price: parseFloat(formData.price),
        calories: parseInt(formData.calories),
        isVeg: formData.isVeg === "true",
        id: initialData?.id,
        updatedAt: new Date().toISOString(),
        updatedBy: "Ravindrajangir007",
      };

      await onSubmit(submissionData);
      toast.success(
        initialData
          ? "Product updated successfully"
          : "Product added successfully"
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="div" className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {initialData ? "Edit Product" : "Add New Product"}
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {initialData
                      ? "Update the product details below"
                      : "Fill in the details for the new product"}
                  </p>
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Product Name*
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter product name"
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Categories*
                        <Select
                          isMulti
                          name="category"
                          options={categoryOptions}
                          className="basic-multi-select mt-1 "
                          classNamePrefix="select"
                          value={categoryOptions.filter((option) =>
                            formData.category.includes(option.value)
                          )}
                          onChange={handleCategoryChange}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Product Images
                        <input
                          type="file"
                          name="images"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              images: Array.from(e.target.files),
                            })
                          }
                          className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm"
                          multiple
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Main Image
                        <input
                          type="file"
                          name="mainImage"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mainImage: e.target.files[0],
                            })
                          }
                          className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm"
                        />
                      </label>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-5">
                        Items
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Serving Size
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Calories
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {formData.items.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {item.servingSize}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {item.calories}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() => editItem(index)}
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    <PencilIcon className="h-5 w-5 inline" />
                                  </button>
                                  <button
                                    onClick={() => removeItem(index)}
                                    className="text-red-500 hover:text-red-700 ml-2"
                                  >
                                    <TrashIcon className="h-5 w-5 inline" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="space-y-4 mt-4 grid grid-cols-3 gap-5">
                        <input
                          type="text"
                          name="name"
                          value={itemData.name}
                          onChange={handleItemChange}
                          className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Item Name"
                        />
                        <input
                          type="text"
                          name="servingSize"
                          value={itemData.servingSize}
                          onChange={handleItemChange}
                          className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Serving Size"
                        />
                        <input
                          type="number"
                          name="calories"
                          value={itemData.calories}
                          onChange={handleItemChange}
                          className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Calories"
                        />
                        {currentItemIndex !== null ? (
                          <button
                            type="button"
                            onClick={updateItem}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                          >
                            Update Item
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={addItem}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                          >
                            <PlusIcon className="h-5 w-5" />
                            Add Item
                          </button>
                        )}
                      </div>
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
                      disabled={
                        isSubmitting ||
                        Object.keys(errors).some((key) => errors[key])
                      }
                    >
                      {isSubmitting
                        ? "Processing..."
                        : initialData
                        ? "Update"
                        : "Add"}{" "}
                      Product
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

export default ProductForm;
