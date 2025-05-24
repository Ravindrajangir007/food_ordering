import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiMapPin, FiEdit2, FiTrash2 } from "react-icons/fi";
import { getAddresses } from "../../service/addressService";
import { getAddressIcon } from "../../config";
import ModelHeader from "../../comon/ModelHeader";

const AddressModal = ({ onClose, onAddNew, onSelect, customer_token }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(
    JSON.parse(localStorage.getItem("selected_address")) || null
  );
  const [editingAddress, setEditingAddress] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchAddress = async (token) => {
      try {
        const address = await getAddresses(token);
        setAddresses(address);
      } catch (error) {
        console.error("Failed to get addresses:", error);
      }
    };

    fetchAddress(customer_token);
  }, [customer_token]);

  const handleEdit = (address) => {
    setEditingAddress({
      ...address,
      newType: address.type,
      newAddress: address.address,
      newArea: address.area,
      newCity: address.city,
    });
  };

  const handleSaveEdit = () => {
    if (editingAddress) {
      setAddresses((prevAddresses) =>
        prevAddresses.map((addr) =>
          addr.id === editingAddress.id
            ? {
                ...addr,
                type: editingAddress.newType,
                address: editingAddress.newAddress,
                area: editingAddress.newArea,
                city: editingAddress.newCity,
              }
            : addr
        )
      );
      setEditingAddress(null);
    }
  };

  const handleDelete = (addressId) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((addr) => addr.id !== addressId)
    );
    setShowDeleteConfirm(null);
    if (selectedAddress?.id === addressId) {
      setSelectedAddress(null); // Clear selected address if deleted
      localStorage.removeItem("selected_address"); // Remove from localStorage
    }
  };

  // Edit Form Component
  const EditForm = ({ address }) => (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium text-gray-700">Type</label>
        <select
          value={editingAddress.newType}
          onChange={(e) =>
            setEditingAddress({ ...editingAddress, newType: e.target.value })
          }
          className="mt-1 w-full rounded-lg border border-gray-200 p-2"
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="PG">PG</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={editingAddress.newAddress}
          onChange={(e) =>
            setEditingAddress({ ...editingAddress, newAddress: e.target.value })
          }
          className="mt-1 w-full rounded-lg border border-gray-200 p-2"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Area</label>
        <input
          type="text"
          value={editingAddress.newArea}
          onChange={(e) =>
            setEditingAddress({ ...editingAddress, newArea: e.target.value })
          }
          className="mt-1 w-full rounded-lg border border-gray-200 p-2"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          value={editingAddress.newCity}
          onChange={(e) =>
            setEditingAddress({ ...editingAddress, newCity: e.target.value })
          }
          className="mt-1 w-full rounded-lg border border-gray-200 p-2"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveEdit}
          className="flex-1 py-1 bg-yellow-500 text-white rounded-lg font-medium"
        >
          Save Changes
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setEditingAddress(null)}
          className="flex-1 py-1 bg-gray-200 text-gray-600 rounded-lg font-medium"
        >
          Cancel
        </motion.button>
      </div>
    </div>
  );

  // Delete Confirmation Component
  const DeleteConfirm = ({ address }) => (
    <div className="p-4 bg-red-50 rounded-xl">
      <p className="text-red-600 text-sm mb-3">
        Are you sure you want to delete this address?
      </p>
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDelete(address.id)}
          className="flex-1 py-1 bg-red-500 text-white rounded-lg"
        >
          Delete
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDeleteConfirm(null)}
          className="flex-1 py-1 bg-gray-200 text-gray-600 rounded-lg font-medium"
        >
          Cancel
        </motion.button>
      </div>
    </div>
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-sky-50 w-full max-w-md rounded-t-3xl overflow-hidden"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModelHeader header="Select Delivery Address" onClose={onClose} />

        {/* Address List */}
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100vh - 50vh)" }}
        >
          <div className="p-4 space-y-2">
            {/* Add New Address Button */}

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onAddNew}
              className="w-full p-2 rounded-xl border-2 border-dashed border-yellow-500 text-yellow-500 flex items-center justify-center gap-2 bg-white cursor-pointer"
            >
              <FiPlus className="w-5 h-5" />
              Add New Address
            </motion.button>

            {/* Address Cards */}
            {addresses.length > 0 &&
              addresses.map((address) => {
                const Icon = getAddressIcon(address.address_type);
                return (
                  <div key={address.id}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className={`p-2 rounded-xl cursor-pointer  ${
                        selectedAddress?.id === address.id
                          ? "border-yellow-500 bg-yellow-50 border border-dashed"
                          : "border-gray-200 bg-white"
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col gap-1 justify-center items-center">
                          <div
                            className={`p-3 rounded-full ${
                              selectedAddress?.id === address.id
                                ? "bg-yellow-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                selectedAddress?.id === address.id
                                  ? "text-yellow-500"
                                  : "text-gray-500"
                              }`}
                            />
                          </div>
                          <span className="text-gray-500 text-xs">
                            {address.address_type}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm text-gray-800 mt-1">
                                {address.fullAddress}
                              </p>
                              <p className="text-sm text-gray-400">
                                {address.city}, {address.state}
                              </p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-gray-100 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(address);
                                }}
                              >
                                <FiEdit2 className="w-4 h-4 text-gray-500" />
                              </motion.button>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-red-100 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDeleteConfirm(address.id);
                                }}
                              >
                                <FiTrash2 className="w-4 h-4 text-red-500" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Edit Form */}
                    {editingAddress?.id === address.id && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-xl">
                        <EditForm address={address} />
                      </div>
                    )}

                    {/* Delete Confirmation */}
                    {showDeleteConfirm === address.id && (
                      <div className="mt-2">
                        <DeleteConfirm address={address} />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="p-4 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (selectedAddress) {
                localStorage.setItem(
                  "selected_address",
                  JSON.stringify(selectedAddress)
                );
                onSelect(selectedAddress);
              }
            }}
            disabled={!selectedAddress}
            className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer ${
              selectedAddress
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiMapPin className="w-5 h-5" />
            Deliver Here
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddressModal;
