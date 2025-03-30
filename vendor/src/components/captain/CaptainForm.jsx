import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  vehicle: "",
  vehicleNumber: "",
  area: "",
  totalOrdersServed: 0,
  addedAt: "",
  addedBy: "",
};

const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: "Name should be 3-50 characters and contain only letters",
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: "Invalid email address",
  },
  phone: {
    required: true,
    pattern: /^[0-9]{10}$/,
    message: "Phone number should be 10 digits",
  },
  vehicle: {
    required: true,
    message: "Vehicle type is required",
  },
  vehicleNumber: {
    required: true,
    pattern: /^[A-Z0-9-]+$/,
    message: "Vehicle number should be alphanumeric",
  },
  area: {
    required: true,
    message: "Delivery area is required",
  },
};

const CaptainForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialFormState, ...initialData });
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

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
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
        id: initialData?.id,
        updatedAt: new Date().toISOString(),
        updatedBy: "Ravindrajangir007",
      };

      await onSubmit(submissionData);
      toast.success(
        initialData
          ? "Captain updated successfully"
          : "Captain added successfully"
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
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
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
                      {initialData ? "Edit Captain" : "Add New Captain"}
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
                      ? "Update the captain details below"
                      : "Fill in the details for the new captain"}
                  </p>
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name*
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter captain name"
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
                          Email*
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                              errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter email"
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.email}
                            </p>
                          )}
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone*
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter phone number"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.phone}
                            </p>
                          )}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Gender*
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                            errors.gender ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="" disabled>
                            Select gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.gender && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.gender}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Vehicle*
                          <input
                            type="text"
                            name="vehicle"
                            value={formData.vehicle}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                              errors.vehicle
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter vehicle type"
                          />
                          {errors.vehicle && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.vehicle}
                            </p>
                          )}
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Vehicle Number*
                          <input
                            type="text"
                            name="vehicleNumber"
                            value={formData.vehicleNumber}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                              errors.vehicleNumber
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter vehicle number"
                          />
                          {errors.vehicleNumber && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.vehicleNumber}
                            </p>
                          )}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Delivery Area*
                        <input
                          type="text"
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                            errors.area ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter delivery area"
                        />
                        {errors.area && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.area}
                          </p>
                        )}
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
                      Captain
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

export default CaptainForm;
