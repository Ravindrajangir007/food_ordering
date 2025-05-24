import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown, FiMenu } from "react-icons/fi";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { fetchOrders } from "../../services/orderService";
import OrderDetailModal from "./OrderDetailModal";

const OrderList = () => {
  const [slots, setSlots] = useState([]); // Slots data
  const [groupedSlots, setGroupedSlots] = useState({}); // Grouped slots by category
  const [selectedSlot, setSelectedSlot] = useState(null); // Currently selected slot
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  // Sidebar and Filters Toggle States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Modal states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Fetch orders on component mount or when filters change
  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filterStatus, dateRange]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const filters = {
        search: searchQuery,
        status: filterStatus !== "All" ? filterStatus : null,
        date_from: dateRange.from || null,
        date_to: dateRange.to || null,
      };

      const response = await fetchOrders(1, 100, filters); // Fetch all slots and orders

      if (response.success) {
        setSlots(response.data.slots);
        setSelectedSlot(response.data.slots[0]?.slot_id || null); // Select the first slot by default

        // Group slots by category
        const grouped = response.data.slots.reduce((acc, slot) => {
          if (!acc[slot.category_name]) {
            acc[slot.category_name] = [];
          }
          acc[slot.category_name].push(slot);
          return acc;
        }, {});
        setGroupedSlots(grouped);
      } else {
        throw new Error(response.message || "Failed to fetch orders");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch orders";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <button
          onClick={loadOrders}
          className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header Section with Filters */}
      <div className="bg-white shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Orders</h1>
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center text-gray-600 cursor-pointer"
          >
            Filters{" "}
            <FiChevronDown
              className={`ml-1 transform ${isFiltersOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Collapsible Filters */}
        {isFiltersOpen && (
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 mt-4">
            {/* Search Input */}
            <div className="relative w-full md:w-auto">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>

            {/* Date Range Filters */}
            <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 w-full">
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, from: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, to: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow gap-2">
        {/* Backdrop for Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 bg-gray-50 p-4 w-72 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:relative md:translate-x-0 md:w-1/4 rounded-2xl z-50 md:z-30`}
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-600 mb-4"
          >
            Close Sidebar
          </button>
          {Object.keys(groupedSlots).map((category) => (
            <div key={category} className="mb-6">
              {/* Category Name */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {category}
              </h3>
              {/* Slots */}
              <div className="space-y-2">
                {groupedSlots[category].map((slot) => {
                  const pendingCount = slot.orders.filter(
                    (order) => order.status === "pending"
                  ).length;

                  return (
                    <button
                      key={slot.slot_id}
                      onClick={() => {
                        setSelectedSlot(slot.slot_id);
                        setIsSidebarOpen(false); // Close sidebar on mobile
                      }}
                      className={`w-full flex justify-between items-center px-4 py-2 rounded-lg text-sm font-medium shadow-sm cursor-pointer ${
                        selectedSlot === slot.slot_id
                          ? "bg-yellow-500 text-white"
                          : "bg-white text-gray-700 border border-gray-200"
                      }`}
                    >
                      <span>{slot.slot_time}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          selectedSlot === slot.slot_id
                            ? "bg-white text-yellow-500"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        Pending: {pendingCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-4 left-4 bg-yellow-500 text-white p-3 rounded-full shadow-lg md:hidden z-50 cursor-pointer"
        >
          <FiMenu className="h-6 w-6" />
        </button>

        {/* Orders Section */}
        <div className="w-full md:w-3/4  p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Orders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots
              .find((slot) => slot.slot_id === selectedSlot)
              ?.orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleOrderClick(order)}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">
                      Order #{order.orderId}
                    </h2>
                    <span
                      className={`text-xs px-3 py-1 rounded-lg capitalize ${
                        order.status === "completed"
                          ? "bg-yellow-100 text-yellow-600"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Customer:</strong> {order.customer.name} (
                      {order.customer.mobile})
                    </p>
                    <p>
                      <strong>Items:</strong> {order.items.length} items
                    </p>
                    <p>
                      <strong>Total:</strong> ₹{order.totalAmount}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {format(new Date(order.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              ))}

            {slots.find((slot) => slot.slot_id === selectedSlot)?.orders
              .length === 0 &&
              !isLoading && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {isDetailModalOpen && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default OrderList;
