import React, { useEffect, useState, useMemo } from "react";
import { PhoneIcon } from "@heroicons/react/24/outline";
import CaptainForm from "./CaptainForm";
import { FiEdit2, FiPlus, FiSearch } from "react-icons/fi";
import {
  fetchCaptains,
  createCaptain,
  updateCaptain,
} from "../../services/deliveryCaptainService";
import toast from "react-hot-toast";

const DeliveryCaptainManager = () => {
  const [allCaptains, setAllCaptains] = useState([]); // Full list of captains
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCaptain, setSelectedCaptain] = useState(null);

  // Fetch all captains on mount
  useEffect(() => {
    const loadCaptains = async () => {
      try {
        setLoading(true);
        const response = await fetchCaptains(); // Fetch all captains from the backend
        if (response.success) {
          setAllCaptains(response.data.captains); // Store the full list of captains
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Failed to fetch captains");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCaptains();
  }, []);

  // Apply search and filter logic
  const filteredCaptains = useMemo(() => {
    return allCaptains.filter((captain) => {
      const matchesSearch = captain.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || captain.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [allCaptains, searchQuery, filterStatus]);

  const handleSubmitCaptain = async (formData) => {
    try {
      if (formData.id) {
        await updateCaptain(formData.id, formData);
        toast.success("Captain updated successfully");
      } else {
        await createCaptain(formData);
        toast.success("Captain created successfully");
      }

      setIsFormOpen(false);
      // Reload captains after adding/updating
      const response = await fetchCaptains();
      if (response.success) {
        setAllCaptains(response.data.captains);
      }
    } catch (error) {
      toast.error(error.message || "Failed to save captain");
      throw error;
    }
  };

  const handleAddCaptain = () => {
    setSelectedCaptain(null);
    setIsFormOpen(true);
  };

  const handleEditCaptain = (captain) => {
    setSelectedCaptain(captain);
    setIsFormOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            Delivery Captains ({filteredCaptains.length})
          </h1>
          <button
            onClick={handleAddCaptain}
            className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"
          >
            <FiPlus className="h-5 w-5 mr-2" /> Add Captain
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search captains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Captains Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCaptains.map((captain) => (
          <div
            key={captain.id}
            className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-4"
          >
            {/* Captain Details */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                {captain.name}
              </h2>
              <button
                onClick={() => handleEditCaptain(captain)}
                className="px-2 py-2 rounded-full bg-gray-100  text-xs cursor-pointer"
              >
                <FiEdit2 className="h-3 w-3" />
              </button>
            </div>

            {/* Mobile Number */}
            <div className="text-sm text-gray-500 flex items-center mt-1">
              <PhoneIcon className="h-4 w-4 mr-1" />
              {captain.mobile}
            </div>

            {/* Assigned Slots */}
            <div className="flex flex-wrap gap-1">
              {captain.assignedSlots.map((slot, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                >
                  {slot}
                </span>
              ))}
            </div>

            {/* Current Orders */}
            <div>
              {captain.currentOrders ? (
                <div>
                  <div className="text-sm text-gray-900">
                    {captain.currentOrders.count} Orders
                  </div>
                  <div className="text-sm text-gray-500">
                    ₹{captain.currentOrders.totalAmount}
                  </div>
                </div>
              ) : (
                <span className="text-sm text-gray-500">No active orders</span>
              )}
            </div>

            {/* Total Orders */}
            <div>
              <div className="text-sm text-gray-900">
                {captain.totalOrders.count} Orders
              </div>
              <div className="text-sm text-gray-500">
                ₹{captain.totalOrders.totalAmount}
              </div>
            </div>

            {/* Status */}
            <div>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  captain.status === "active"
                    ? "bg-yellow-50 text-yellow-700 border border-yellow-500"
                    : "bg-red-50 text-red-700 border border-red-500"
                }`}
              >
                {captain.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}

        {filteredCaptains.length === 0 && (
          <div className="text-center py-8 col-span-full">
            <p className="text-gray-500">No captains found</p>
          </div>
        )}
      </div>

      <CaptainForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitCaptain}
        initialData={selectedCaptain}
      />
    </div>
  );
};

export default DeliveryCaptainManager;
