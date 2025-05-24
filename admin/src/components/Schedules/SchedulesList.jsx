import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiPause, FiPlay, FiInbox } from "react-icons/fi";

const daysOfWeek = [
  { id: "SU", label: "Sun" },
  { id: "MO", label: "Mon" },
  { id: "TU", label: "Tue" },
  { id: "WE", label: "Wed" },
  { id: "TH", label: "Thu" },
  { id: "FR", label: "Fri" },
  { id: "SA", label: "Sat" },
];

// Sample static schedules data with userMobile and vendorName
const sampleSchedules = [
  {
    id: 1,
    userMobile: "9876543210",
    vendorName: "Vendor A",
    delivery_slots: {
      category_name: "Morning Slot",
      display_time: "8:00 AM - 12:00 PM",
      category_icon: "☀️",
    },
    delivery_days: [
      { day: "MO", schedule: true },
      { day: "TU", schedule: true },
      { day: "WE", schedule: false },
      { day: "TH", schedule: true },
      { day: "FR", schedule: false },
    ],
    cart_items: [
      { id: 1, name: "Apples", quantity: 3, price: 30 },
      { id: 2, name: "Bananas", quantity: 5, price: 10 },
    ],
    fullAddress: "123, Green Street, Cityville",
    status: "running",
  },
  {
    id: 2,
    userMobile: "9123456780",
    vendorName: "Vendor B",
    delivery_slots: {
      category_name: "Evening Slot",
      display_time: "4:00 PM - 8:00 PM",
      category_icon: "🌙",
    },
    delivery_days: [
      { day: "MO", schedule: false },
      { day: "TU", schedule: true },
      { day: "WE", schedule: true },
      { day: "TH", schedule: false },
      { day: "FR", schedule: true },
    ],
    cart_items: [
      { id: 3, name: "Milk", quantity: 2, price: 40 },
      { id: 4, name: "Bread", quantity: 1, price: 25 },
    ],
    fullAddress: "456, Blue Avenue, Townsville",
    status: "pause",
  },
];

const SchedulesList = () => {
  const [schedules, setSchedules] = useState(sampleSchedules);

  // Filters state
  const [filters, setFilters] = useState({
    userMobile: "",
    vendorName: "",
  });

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter schedules based on userMobile and vendorName (case-insensitive)
  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const mobileMatch = schedule.userMobile
        .toLowerCase()
        .includes(filters.userMobile.toLowerCase());
      const vendorMatch = schedule.vendorName
        .toLowerCase()
        .includes(filters.vendorName.toLowerCase());
      return mobileMatch && vendorMatch;
    });
  }, [schedules, filters]);

  // Toggle delivery day schedule
  const toggleDaySchedule = (scheduleId, dayId) => {
    setSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id === scheduleId) {
          const updatedDays = schedule.delivery_days.map((day) =>
            day.day === dayId ? { ...day, schedule: !day.schedule } : day
          );
          return { ...schedule, delivery_days: updatedDays };
        }
        return schedule;
      })
    );
  };

  // Toggle entire schedule pause/resume
  const toggleScheduleStatus = (scheduleId) => {
    setSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id === scheduleId) {
          return {
            ...schedule,
            status: schedule.status === "pause" ? "running" : "pause",
          };
        }
        return schedule;
      })
    );
  };

  // Calculate total price for cart items
  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-4">
      {/* Dashboard Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate">
            All Schedules
          </h2>
        </div>
      </div>

      {/* Filters */}
      <Filters filters={filters} onChange={handleFilterChange} />

      {filteredSchedules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <FiInbox className="w-12 h-12 text-gray-400" />
          <p className="text-gray-600">No schedules found.</p>
        </div>
      ) : (
        filteredSchedules.map((schedule, idx) => (
          <motion.div
            key={schedule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow p-4 mb-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-50 rounded-full text-yellow-600 text-xl">
                  {schedule.delivery_slots.category_icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {schedule.delivery_slots.category_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {schedule.delivery_slots.display_time}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Vendor: <strong>{schedule.vendorName}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    User Mobile: <strong>{schedule.userMobile}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleScheduleStatus(schedule.id)}
                aria-label={
                  schedule.status === "pause"
                    ? "Resume Schedule"
                    : "Pause Schedule"
                }
                className={`text-xs font-semibold rounded-xl px-4 py-2 transition ${
                  schedule.status === "pause"
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {schedule.status === "pause" ? "Resume" : "Pause"}
              </button>
            </div>

            {/* Delivery Days */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Delivery Days</h4>
              <div className="grid grid-cols-7 gap-2">
                {schedule.delivery_days.map((day) => {
                  const dayLabel =
                    daysOfWeek.find((d) => d.id === day.day)?.label || day.day;
                  return (
                    <div
                      key={day.day}
                      onClick={() => toggleDaySchedule(schedule.id, day.day)}
                      className={`cursor-pointer rounded-xl p-2 border flex items-center justify-between select-none ${
                        day.schedule
                          ? "bg-yellow-50 border-yellow-300 text-yellow-600"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          toggleDaySchedule(schedule.id, day.day);
                        }
                      }}
                      aria-pressed={day.schedule}
                      aria-label={`Toggle delivery day ${dayLabel}`}
                    >
                      <span className="text-xs font-semibold">{dayLabel}</span>
                      {day.schedule ? (
                        <FiPause className="w-4 h-4" />
                      ) : (
                        <FiPlay className="w-4 h-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4 border-t border-gray-100 pt-4">
              <h4 className="text-sm font-medium mb-2">Order Items</h4>
              <div className="space-y-1 text-xs">
                {schedule.cart_items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
                  <span>Total per day</span>
                  <span>₹{calculateTotal(schedule.cart_items)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="text-xs text-gray-700 border-t border-gray-100 pt-3">
              <strong>Delivery Address:</strong> {schedule.fullAddress}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

const Filters = ({ filters, onChange }) => (
  <div className="bg-white p-4 rounded-md shadow mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <div>
      <label
        htmlFor="userMobile"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Search by User Mobile
      </label>
      <input
        type="tel"
        id="userMobile"
        name="userMobile"
        value={filters.userMobile}
        onChange={onChange}
        placeholder="Enter mobile number"
        autoComplete="off"
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div>
      <label
        htmlFor="vendorName"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Search by Vendor Name
      </label>
      <input
        type="text"
        id="vendorName"
        name="vendorName"
        value={filters.vendorName}
        onChange={onChange}
        placeholder="Enter vendor name"
        autoComplete="off"
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>
  </div>
);

export default SchedulesList;
