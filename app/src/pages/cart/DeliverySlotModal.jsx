import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiX,
  FiClock,
  FiCalendar,
  FiCheck,
  FiMapPin,
  FiEdit2,
} from "react-icons/fi";

import { fetchDeliverySlots } from "../../service/deliverySlots";
import { useUniqueCategories } from "../../context/CartContext";
import ModelHeader from "../../comon/ModelHeader";

const DeliverySlotModal = ({ onClose, onSelect, onEditAddress }) => {
  const uniqueCategories = useUniqueCategories();

  const [selectedDays, setSelectedDays] = useState(() => {
    const saved = localStorage.getItem("selected_days");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedSlots, setSelectedSlots] = useState(() => {
    const saved = localStorage.getItem("selected_slots");
    return saved ? JSON.parse(saved) : {};
  });
  const [loading, setLoading] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(
    JSON.parse(localStorage.getItem("selected_address")) || null
  );
  const [deliverySlots, setDeliverySlots] = useState([]);

  // Days of the week
  const daysOfWeek = useMemo(
    () => [
      { id: "SU", label: "Sun" },
      { id: "MO", label: "Mon" },
      { id: "TU", label: "Tue" },
      { id: "WE", label: "Wed" },
      { id: "TH", label: "Thu" },
      { id: "FR", label: "Fri" },
      { id: "SA", label: "Sat" },
    ],
    []
  );

  const quickSelections = useMemo(
    () => [
      { label: "All Days", days: daysOfWeek.map((day) => day.id) },
      { label: "Weekdays", days: ["MO", "TU", "WE", "TH", "FR"] },
      { label: "Alternate Days", days: ["MO", "WE", "FR", "SU"] },
    ],
    [daysOfWeek]
  );

  useEffect(() => {
    if (!uniqueCategories || uniqueCategories.length === 0) return;

    const categories = uniqueCategories.map((item) => item.category);

    const getAllDeliverySlots = async () => {
      setLoading(true);
      try {
        const slots = await fetchDeliverySlots(JSON.stringify(categories));
        setDeliverySlots(slots);
      } catch (error) {
        console.error("Error fetching delivery slots:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllDeliverySlots();
  }, []);

  const groupedSlots = useMemo(() => {
    if (!deliverySlots || !Array.isArray(deliverySlots)) return {};

    return deliverySlots.reduce((acc, slot) => {
      const category = slot.category_name || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(slot);
      return acc;
    }, {});
  }, [deliverySlots]);

  const toggleDay = (dayId) => {
    setSelectedDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId]
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-sky-50 w-full max-w-md rounded-t-3xl overflow-hidden max-h-[85vh] overflow-y-auto"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
      >
        <ModelHeader header="Select Delivery Days & Slot" onClose={onClose} />

        <div className="p-2 space-y-2">
          {selectedAddress && (
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={onEditAddress}
              className="flex items-start gap-3 bg-white rounded-xl cursor-pointer "
            >
              <div className="flex-1">
                <div className="flex justify-between items-center gap-2 border-b border-b-gray-200 p-3 pb-2">
                  <div className="flex items-center gap-2 ">
                    <FiMapPin className="w-4 h-4 text-yellow-500" />
                    <h3 className="poppins-medium text-sm">Delivery Address</h3>
                  </div>
                  <div className=" ">
                    <FiEdit2 className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs poppins-regular p-3">
                  {selectedAddress.flat_no}, {selectedAddress.floor_no},{" "}
                  {selectedAddress.building_name}, {selectedAddress.landmark},{" "}
                  {selectedAddress.fullAddress}
                </p>
              </div>
            </motion.div>
          )}
          {/* Days Selection */}

          <div className="bg-white rounded-xl">
            <div className="flex justify-between items-center gap-2 border-b border-b-gray-200 p-3 pb-2">
              <div className="flex items-center gap-2 ">
                <FiCalendar className="w-4 h-4 text-yellow-500" />
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Select Days
                </h3>
              </div>
              <span className="text-xs text-gray-500">
                Selected: {selectedDays.length}
              </span>
            </div>

            {/* Quick Selection Buttons */}
            <div className="flex justify-start items-center gap-2 mb-3 p-2">
              {quickSelections.map((selection) => (
                <motion.button
                  key={selection.label}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDays(selection.days)}
                  className="text-xs px-2 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer text-nowrap"
                >
                  {selection.label}
                </motion.button>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 p-2 pt-0">
              {/* {daysOfWeek.map(renderDayButton)} */}
              {daysOfWeek.map((day, index) => (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleDay(day.id)}
                  className={`relative p-3 rounded-xl border-2 flex flex-col items-center cursor-pointer ${
                    selectedDays.includes(day.id)
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  <span
                    className={`text-xs font-medium ${
                      selectedDays.includes(day.id)
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    {day.label}
                  </span>
                  {selectedDays.includes(day.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center"
                    >
                      <FiCheck className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="bg-white rounded-xl">
            <div className="flex justify-between items-center gap-2 border-b border-b-gray-200 p-3 pb-2">
              <div className="flex items-center gap-2 ">
                <FiClock className="w-4 h-4 text-yellow-500" />
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Select Time Slot
                </h3>
              </div>
            </div>

            <div className="space-y-4 bg-white p-2 rounded-xl">
              {Object.entries(groupedSlots).map(([categoryName, slots]) => (
                <div key={categoryName} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    {categoryName}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((slot) => {
                      const isSelected =
                        selectedSlots[categoryName]?.id === slot.id;
                      return (
                        <motion.button
                          key={slot.id}
                          whileTap={{ scale: 0.95 }}
                          className={`relative p-3 rounded-xl border-2 cursor-pointer ${
                            isSelected
                              ? "border-yellow-500 bg-yellow-50"
                              : "border-gray-200"
                          }`}
                          onClick={() =>
                            setSelectedSlots((prev) => ({
                              ...prev,
                              [categoryName]: slot,
                            }))
                          }
                        >
                          <div className="text-center">
                            <p
                              className={`text-xs ${
                                isSelected ? "text-yellow-600" : "text-gray-500"
                              }`}
                            >
                              {slot.display_time}
                            </p>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center"
                            >
                              <FiCheck className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Instructions */}
          <div className="bg-yellow-50 p-4 rounded-xl text-xs">
            <h4 className="font-medium text-yellow-800 mb-2">
              Delivery Instructions
            </h4>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• Orders will be delivered on selected days</li>
              <li>• Same time slot will be used for all selected days</li>
              <li>• You can modify your schedule anytime</li>
            </ul>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (
                selectedDays.length > 0 &&
                Object.keys(selectedSlots).length > 0
              ) {
                localStorage.setItem(
                  "selected_days",
                  JSON.stringify(selectedDays)
                );
                localStorage.setItem(
                  "selected_slots",
                  JSON.stringify(selectedSlots)
                );
                onSelect(selectedSlots, selectedDays);
              }
            }}
            disabled={
              selectedDays.length === 0 ||
              Object.keys(selectedSlots).length === 0
            }
            className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer ${
              selectedDays.length === 0 ||
              Object.keys(selectedSlots).length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white"
            }`}
          >
            <FiCheck className="w-5 h-5" />
            Confirm Schedule
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeliverySlotModal;
