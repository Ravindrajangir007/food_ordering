import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPause, FiPlay, FiArrowLeft } from "react-icons/fi";
import DeliverySlotModal from "./cart/DeliverySlotModal";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteDeliverySchedule,
  fetchDeliverySchedules,
  toggleDeliveryDaySchedule,
  toggleDeliverySchedule,
} from "../service/schedules";
import { FiInbox, FiPlus } from "react-icons/fi";
import ConfirmModal from "../comon/ConfirmModal";
import MiniHeader from "../Header/MiniHeader";

const MySchedule = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [showDeliverySlotModal, setShowDeliverySlotModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [error, setError] = useState("");

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmPayload, setConfirmPayload] = useState(null);

  // Function to open modal with action info
  const openConfirmModal = (title, message, action, payload) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setConfirmPayload(payload);
    setConfirmModalOpen(true);
  };

  // Confirm modal handlers
  const handleConfirm = () => {
    if (confirmAction) confirmAction(confirmPayload);
    setConfirmModalOpen(false);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  useEffect(() => {
    const getSchedules = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetchDeliverySchedules(); // Adjust endpoint as needed
        if (response.success) {
          setSchedules(response.schedules);
        } else {
          setError("Failed to fetch schedules");
        }
      } catch (err) {
        setError("Error fetching schedules");
      } finally {
        setLoading(false);
      }
    };

    getSchedules();
  }, []);

  // Days of the week mapping
  const daysOfWeek = [
    { id: "SU", label: "Sun", fullName: "Sunday" },
    { id: "MO", label: "Mon", fullName: "Monday" },
    { id: "TU", label: "Tue", fullName: "Tuesday" },
    { id: "WE", label: "Wed", fullName: "Wednesday" },
    { id: "TH", label: "Thu", fullName: "Thursday" },
    { id: "FR", label: "Fri", fullName: "Friday" },
    { id: "SA", label: "Sat", fullName: "Saturday" },
  ];

  const togglePause = async (scheduleId, dayId) => {
    try {
      const result = await toggleDeliveryDaySchedule(scheduleId, dayId);
      if (result.success) {
        setSchedules(
          schedules.map((schedule) => {
            if (schedule.id === scheduleId) {
              // Map delivery_days and toggle schedule for matching day
              const updatedDeliveryDays = schedule.delivery_days.map((day) => {
                if (day.day === dayId) {
                  return { ...day, schedule: !day.schedule };
                }
                return day;
              });

              return {
                ...schedule,
                delivery_days: updatedDeliveryDays,
              };
            }
            return schedule;
          })
        );
      } else {
        console.error("Failed to toggle:", result.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handlePauseSchedule = async (scheduleId) => {
    try {
      const result = await toggleDeliverySchedule(scheduleId);
      if (result.success) {
        setSchedules((prevSchedules) =>
          prevSchedules.map((schedule) => {
            if (schedule.id === scheduleId) {
              return {
                ...schedule,
                status: schedule.status === "pause" ? "running" : "pause",
              };
            }
            return schedule;
          })
        );
      } else {
        console.error("Failed to toggle:", result.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };
  const handleDeleteSchedule = async (scheduleId) => {
    try {
      const result = await deleteDeliverySchedule(scheduleId);
      if (result.success) {
        setSchedules((prevSchedules) =>
          prevSchedules.filter((schedule) => schedule.id !== scheduleId)
        );
      } else {
        console.error("Failed to toggle:", result.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  // Calculate total amount
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <motion.div
      className="min-h-screen bg-sky-50"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Header */}
      <MiniHeader heading="My Schedule" />

      <div className="p-2 py-4 space-y-4 max-w-6xl 2xl:max-w-7xl mx-auto ">
        {/* Loading and error */}
        {loading && <p>Loading schedules...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && schedules.length === 0 && (
          <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FiInbox className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-800 font-medium">No schedules found</h3>
            <p className="text-sm text-gray-500 mt-1">
              You don't have any active schedules yet. Start by creating a new
              schedule.
            </p>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-xl font-semibold transition cursor-pointer text-xs mt-5"
            >
              <FiPlus className="w-5 h-5" />
              Create Schedule
            </button>
          </div>
        )}
        {/* Paused Deliveries Summary */}

        <div className="space-y-4">
          {schedules.map((schedule, index) => (
            <motion.div
              key={schedule.id}
              className="bg-white rounded-2xl shadow-sm "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="p-2 px-4 border-b border-gray-100 flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-yellow-50 rounded-full">
                      <span className=" text-yellow-600 text-xl">
                        {schedule.delivery_slots.category_icon}
                      </span>
                    </div>
                    <h3 className="font-medium">
                      {schedule.delivery_slots.category_name}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {schedule.delivery_slots.display_time}
                </p>
              </motion.div>

              {/* Delivery Days */}
              <div className="p-4">
                <h4 className="text-sm font-medium mb-3">Delivery Days</h4>
                <div className="grid grid-cols-5 gap-2">
                  {schedule.delivery_days.map((item, dayIndex) => {
                    const day = daysOfWeek.find((d) => d.id === item.day);
                    const isActive = item.schedule;
                    return (
                      <div
                        key={dayIndex}
                        className={`p-2 rounded-xl border cursor-pointer ${
                          isActive
                            ? "border-yellow-100 bg-yellow-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                        onClick={() => togglePause(schedule.id, item.day)}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-medium ${
                              isActive ? "text-yellow-600" : "text-gray-400"
                            }`}
                          >
                            {day?.label || item.day}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className={`p-1 rounded-full ${
                              isActive ? "bg-yellow-100" : "bg-gray-100"
                            }`}
                          >
                            {isActive ? (
                              <FiPause className="w-3 h-3 text-yellow-600 cursor-pointer" />
                            ) : (
                              <FiPlay className="w-3 h-3 text-gray-500 cursor-pointer" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-3">Order Items</h4>
                <div className="space-y-2">
                  {schedule.cart_items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-gray-600">
                        {item.quantity}x {item.name}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs pt-2 border-t border-gray-100 font-medium">
                    <span>Total per day</span>
                    <span>₹{calculateTotal(schedule.cart_items)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="p-4 border-t border-gray-100 text-xs text-gray-700">
                <p className="flex flex-col">
                  <strong>Delivery Address:</strong> {schedule.fullAddress}
                </p>
              </div>

              {/* Schedule Actions */}
              <div className="p-2 border-t border-gray-100 flex gap-2">
                {/* <button
                  onClick={() => {
                    setSelectedSchedule(schedule);
                    setShowDeliverySlotModal(true);
                  }}
                  className="flex-1 py-3 bg-yellow-50 text-yellow-600 rounded-xl text-xs font-medium cursor-pointer"
                >
                  Edit Schedule
                </button> */}
                <button
                  onClick={() =>
                    openConfirmModal(
                      schedule.status === "pause"
                        ? "Resume Schedule"
                        : "Pause Schedule",
                      schedule.status === "pause"
                        ? "Are you sure you want to resume this schedule?"
                        : "Are you sure you want to pause this schedule?",
                      handlePauseSchedule,
                      schedule.id
                    )
                  }
                  className={`flex-1 py-3 rounded-xl text-xs font-medium cursor-pointer ${
                    schedule.status === "pause"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {schedule.status === "pause"
                    ? "Resume Schedule"
                    : "Pause Schedule"}
                </button>

                {schedule.status === "pause" && (
                  <button
                    onClick={() =>
                      openConfirmModal(
                        "Delete Schedule",
                        "Are you sure you want to delete this schedule? This action cannot be undone.",
                        handleDeleteSchedule,
                        schedule.id
                      )
                    }
                    className="flex-1 py-3 rounded-xl text-xs font-medium cursor-pointer bg-red-50 text-red-600"
                  >
                    Delete Schedule
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Delivery Slot Modal */}
      <AnimatePresence>
        {showDeliverySlotModal && (
          <DeliverySlotModal
            onClose={() => setShowDeliverySlotModal(false)}
            onSelect={(newSchedule) => {
              // Handle new schedule selection
              setShowDeliverySlotModal(false);
            }}
            currentSchedule={selectedSchedule}
          />
        )}

        {confirmModalOpen && (
          <ConfirmModal
            isOpen={confirmModalOpen}
            title={confirmTitle}
            message={confirmMessage}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MySchedule;
