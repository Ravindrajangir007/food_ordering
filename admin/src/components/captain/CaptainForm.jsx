import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { fetchSlots } from "../../services/deliverySlotService";

const initialFormState = {
  name: "",
  mobile: "",
  email: "",
  status: "active",
  assignedSlots: [],
  currentOrders: {
    count: 0,
    totalAmount: 0,
  },
  totalOrders: {
    count: 0,
    totalAmount: 0,
  },
};

const CaptainForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  console.log("availableSlots", availableSlots);
  // Fetch available slots
  useEffect(() => {
    const loadSlots = async () => {
      try {
        setIsLoadingSlots(true);
        const response = await fetchSlots();
        if (response.success) {
          // Only get active slots
          const activeSlots = response.data.filter((slot) => slot.is_active);
          setAvailableSlots(activeSlots);
        } else {
          toast.error("Failed to load time slots");
        }
      } catch (error) {
        console.error("Error loading slots:", error);
        toast.error("Failed to load time slots");
      } finally {
        setIsLoadingSlots(false);
      }
    };

    if (isOpen) {
      loadSlots();
    }
  }, [isOpen]);

  // Set initial form data
  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialFormState, ...initialData });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSlotToggle = (slotId) => {
    setFormData((prev) => {
      const newSlots = prev.assignedSlots.includes(slotId)
        ? prev.assignedSlots.filter((id) => id !== slotId)
        : [...prev.assignedSlots, slotId];

      return {
        ...prev,
        assignedSlots: newSlots,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.assignedSlots.length === 0) {
      newErrors.slots = "Please select at least one time slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        id: initialData?.id,
        updatedAt: new Date().toISOString(),
      };

      await onSubmit(submissionData);
      toast.success(
        initialData
          ? "Captain updated successfully"
          : "Captain added successfully"
      );
      onClose();
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
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
            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-medium text-gray-900">
                  {initialData ? "Edit Captain" : "Add New Captain"}
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 cursor-pointer"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name*
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } p-2`}
                      />
                    </label>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile*
                      <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.mobile ? "border-red-500" : "border-gray-300"
                        } p-2`}
                      />
                    </label>
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.mobile}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } p-2`}
                    />
                  </label>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Slots */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Slots*
                  </label>
                  {isLoadingSlots ? (
                    <div className="flex gap-3">
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap gap-3">
                        {availableSlots.map((slot) => (
                          <label
                            key={slot.id}
                            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${
                              formData.assignedSlots.includes(slot.display_time)
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.assignedSlots.includes(
                                slot.display_time
                              )}
                              onChange={() =>
                                handleSlotToggle(slot.display_time)
                              }
                              className="sr-only"
                            />
                            <span>{slot.display_time}</span>
                          </label>
                        ))}
                      </div>
                      {errors.slots && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.slots}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting || isLoadingSlots}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : initialData
                      ? "Update Captain"
                      : "Add Captain"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CaptainForm;
