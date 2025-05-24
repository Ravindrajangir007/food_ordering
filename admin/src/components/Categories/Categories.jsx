import React, { useState, useEffect } from "react";

const initialCategories = [
  {
    id: 1,
    name: "Fruits",
    icon: "🍎",
    description: "Fresh and organic fruits",
    sort_order: 1,
    status: "active",
    created_at: "2024-01-01T10:00:00Z",
    updated_at: "2024-01-10T12:00:00Z",
  },
  {
    id: 2,
    name: "Vegetables",
    icon: "🥦",
    description: "Green and healthy vegetables",
    sort_order: 2,
    status: "inactive",
    created_at: "2024-01-05T11:00:00Z",
    updated_at: "2024-01-15T14:00:00Z",
  },
  // Add more sample categories as needed
];

const CategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    icon: "",
    description: "",
    sort_order: 0,
    status: "active",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
        icon: category.icon,
        description: category.description,
        sort_order: category.sort_order,
        status: category.status,
      });
    } else {
      setFormData({
        id: null,
        name: "",
        icon: "",
        description: "",
        sort_order: 0,
        status: "active",
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "sort_order" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6">
        <h2 className="text-2xl font-bold mb-6">
          {formData.id ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1" htmlFor="name">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="icon">
              Icon (Emoji or text)
            </label>
            <input
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              type="text"
              maxLength={2}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g. 🍎"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="sort_order">
              Sort Order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              value={formData.sort_order}
              onChange={handleChange}
              type="number"
              min={0}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const openAddModal = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
  };

  const saveCategory = (categoryData) => {
    if (categoryData.id) {
      // Update existing
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryData.id
            ? { ...categoryData, updated_at: new Date().toISOString() }
            : cat
        )
      );
    } else {
      // Add new
      const newCategory = {
        ...categoryData,
        id: categories.length
          ? Math.max(...categories.map((c) => c.id)) + 1
          : 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    closeModal();
  };

  const toggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              status: cat.status === "active" ? "inactive" : "active",
              updated_at: new Date().toISOString(),
            }
          : cat
      )
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold leading-7 text-gray-900">
          Categories
        </h1>
        <button
          onClick={openAddModal}
          className="px-5 py-2 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600"
        >
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 bg-white p-2 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Name",
                "Icon",
                "Description",
                "Sort Order",
                "Status",
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
            {categories.length > 0 ? (
              categories
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-yellow-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {cat.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="text-2xl">{cat.icon}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                      {cat.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {cat.sort_order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(cat.id)}
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                          cat.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        title="Toggle Status"
                      >
                        {cat.status.charAt(0).toUpperCase() +
                          cat.status.slice(1)}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(cat.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(cat.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="text-yellow-600 hover:text-yellow-800 font-semibold"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-8 text-gray-500 italic text-sm"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CategoryModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={saveCategory}
        category={editingCategory}
      />
    </div>
  );
};

export default Categories;
