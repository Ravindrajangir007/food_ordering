import { Fragment, useState } from "react";
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
  startTime: {
    required: true,
    message: "Start time is required",
  },
  endTime: {
    required: true,
    message: "End time is required",
  },
};

const NewMealTypeModal = ({ isOpen, onClose, onSubmit, mealType = null }) => {
  const [formData, setFormData] = useState({
    name: mealType?.name || "",
    startTime: mealType?.startTime || "",
    endTime: mealType?.endTime || "",
    description: mealType?.description || "",
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();

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

    // Validate time range
    const start = new Date(`2000/01/01 ${formData.startTime}`);
    const end = new Date(`2000/01/01 ${formData.endTime}`);
    if (end <= start) {
      toast.error("End time must be after start time");
      return;
    }

    onSubmit({
      ...formData,
      id: mealType?.id || Date.now().toString(),
      time: `${formData.startTime} - ${formData.endTime}`,
    });
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
                      {mealType ? "Edit Meal Type" : "Add New Meal Type"}
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="e.g., Breakfast"
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
                        Start Time*
                        <input
                          type="time"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                            errors.startTime
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.startTime && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.startTime}
                          </p>
                        )}
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Time*
                        <input
                          type="time"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                            errors.endTime
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.endTime && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.endTime}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="2"
                        className="mt-1 block w-full rounded-md border-gray-300 border p-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Optional description"
                      />
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      {mealType ? "Update" : "Add"} Meal Type
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

export default NewMealTypeModal;
