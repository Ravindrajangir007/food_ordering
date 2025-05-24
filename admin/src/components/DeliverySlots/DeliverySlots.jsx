import React, { useState, useEffect } from "react";

const initialCategories = [
  { id: 1, name: "Fruits" },
  { id: 2, name: "Vegetables" },
  // Add more categories as needed
];

const initialDeliverySlots = [
  {
    id: 1,
    category_id: 1,
    start_time: "09:00",
    end_time: "12:00",
    is_active: true,
    created_at: "2024-01-01T10:00:00Z",
    updated_at: "2024-01-10T12:00:00Z",
  },
  {
    id: 2,
    category_id: 2,
    start_time: "13:00",
    end_time: "16:00",
    is_active: false,
    created_at: "2024-01-05T11:00:00Z",
    updated_at: "2024-01-15T14:00:00Z",
  },
  // Add more slots as needed
];

const DeliverySlotModal = ({ isOpen, onClose, onSave, slot, categories }) => {
  const [formData, setFormData] = useState({
    id: null,
    category_id: "",
    start_time: "",
    end_time: "",
    is_active: true,
  });

  useEffect(() => {
    if (slot) {
      setFormData({
        id: slot.id,
        category_id: slot.category_id,
        start_time: slot.start_time,
        end_time: slot.end_time,
        is_active: slot.is_active,
      });
    } else {
      setFormData({
        id: null,
        category_id: categories.length > 0 ? categories[0].id : "",
        start_time: "",
        end_time: "",
        is_active: true,
      });
    }
  }, [slot, categories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category_id) {
      alert("Category is required");
      return;
    }
    if (!formData.start_time || !formData.end_time) {
      alert("Start time and End time are required");
      return;
    }
    if (formData.start_time >= formData.end_time) {
      alert("End time must be after start time");
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-6">
          {formData.id ? "Edit Delivery Slot" : "Add Delivery Slot"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="category_id" className="block font-semibold mb-1">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="start_time" className="block font-semibold mb-1">
              Start Time <span className="text-red-600">*</span>
            </label>
            <input
              id="start_time"
              name="start_time"
              type="time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label htmlFor="end_time" className="block font-semibold mb-1">
              End Time <span className="text-red-600">*</span>
            </label>
            <input
              id="end_time"
              name="end_time"
              type="time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={handleChange}
              className="h-5 w-5 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
            />
            <label htmlFor="is_active" className="font-semibold">
              Active
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
            >
              {formData.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeliverySlots = () => {
  const [categories] = useState(initialCategories);
  const [slots, setSlots] = useState(initialDeliverySlots);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const openAddModal = () => {
    setEditingSlot(null);
    setModalOpen(true);
  };

  const openEditModal = (slot) => {
    setEditingSlot(slot);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingSlot(null);
  };

  const saveSlot = (slotData) => {
    if (slotData.id) {
      // Update existing
      setSlots((prev) =>
        prev.map((s) =>
          s.id === slotData.id
            ? { ...slotData, updated_at: new Date().toISOString() }
            : s
        )
      );
    } else {
      // Add new
      const newSlot = {
        ...slotData,
        id: slots.length ? Math.max(...slots.map((s) => s.id)) + 1 : 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setSlots((prev) => [...prev, newSlot]);
    }
    closeModal();
  };

  // Group slots by category
  const slotsByCategory = categories.map((cat) => ({
    ...cat,
    slots: slots.filter((slot) => slot.category_id === cat.id),
  }));

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold leading-7 text-gray-900">
          Delivery Slots
        </h1>
        <button
          onClick={openAddModal}
          className="px-5 py-2 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600"
        >
          Add Delivery Slot
        </button>
      </div>
      <div className="space-y-2">
        {slotsByCategory.map((cat) => (
          <section
            key={cat.id}
            className="overflow-x-auto border border-gray-200 bg-white p-2 rounded-xl"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {cat.name}
            </h2>
            {cat.slots.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "ID",
                        "Start Time",
                        "End Time",
                        "Active",
                        "Created At",
                        "Updated At",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cat.slots.map((slot) => (
                      <tr
                        key={slot.id}
                        className="hover:bg-yellow-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {slot.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {slot.start_time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {slot.end_time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              slot.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {slot.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(slot.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(slot.updated_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                          <button
                            onClick={() => openEditModal(slot)}
                            className="text-yellow-600 hover:text-yellow-800 font-semibold"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No delivery slots for this category.
              </p>
            )}
          </section>
        ))}
      </div>
      <DeliverySlotModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={saveSlot}
        slot={editingSlot}
        categories={categories}
      />
    </div>
  );
};

export default DeliverySlots;
