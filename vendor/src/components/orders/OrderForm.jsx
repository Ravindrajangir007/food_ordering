import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import toast from "react-hot-toast";

const initialOrderState = {
  customerName: "",
  status: "",
  items: [],
  totalPrice: 0,
};

const initialItemState = {
  name: "",
  quantity: "",
  price: "",
};

const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "Shipped", label: "Shipped" },
  { value: "Delivered", label: "Delivered" },
  { value: "Cancelled", label: "Cancelled" },
];

const predefinedItems = [
  { value: "Breakfast Thali", label: "Breakfast Thali", price: 150 },
  { value: "Lunch Thali", label: "Lunch Thali", price: 250 },
  { value: "Coffee", label: "Coffee", price: 50 },
];

const fetchCustomerSuggestions = async (inputValue) => {
  // Simulate fetching customer names from an API
  const allCustomers = [
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Alice Johnson", label: "Alice Johnson" },
  ];
  return allCustomers.filter((customer) =>
    customer.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const OrderForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [orderData, setOrderData] = useState(initialOrderState);
  const [itemData, setItemData] = useState(initialItemState);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setOrderData(initialData);
    } else {
      setOrderData(initialOrderState);
    }
  }, [initialData, isOpen]);

  const handleOrderChange = (selectedOption) => {
    setOrderData((prev) => ({
      ...prev,
      customerName: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleStatusChange = (selectedOption) => {
    setOrderData((prev) => ({
      ...prev,
      status: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleItemChange = (selectedOption) => {
    const selectedItem = predefinedItems.find(
      (item) => item.value === selectedOption.value
    );
    setItemData((prev) => ({
      ...prev,
      name: selectedItem.value,
      price: selectedItem.price,
    }));
  };

  const addItem = () => {
    const newItems = [
      ...orderData.items,
      {
        ...itemData,
        price: Number(itemData.price),
        quantity: Number(itemData.quantity),
      },
    ];
    const totalPrice = newItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setOrderData((prev) => ({
      ...prev,
      items: newItems,
      totalPrice,
    }));

    setItemData(initialItemState);
  };

  const updateItem = () => {
    const newItems = orderData.items.map((item, index) =>
      index === currentItemIndex
        ? {
            ...itemData,
            price: Number(itemData.price),
            quantity: Number(itemData.quantity),
          }
        : item
    );
    const totalPrice = newItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setOrderData((prev) => ({
      ...prev,
      items: newItems,
      totalPrice,
    }));

    setItemData(initialItemState);
    setCurrentItemIndex(null);
  };

  const editItem = (index) => {
    setItemData(orderData.items[index]);
    setCurrentItemIndex(index);
  };

  const removeItem = (index) => {
    const newItems = orderData.items.filter((_, i) => i !== index);
    const totalPrice = newItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setOrderData((prev) => ({
      ...prev,
      items: newItems,
      totalPrice,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(orderData);
      toast.success(
        initialData ? "Order updated successfully" : "Order added successfully"
      );
      onClose();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="div" className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {initialData ? "Edit Order" : "Add New Order"}
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {initialData
                      ? "Update the order details below"
                      : "Fill in the details for the new order"}
                  </p>
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Customer Name*
                        <AsyncSelect
                          cacheOptions
                          loadOptions={fetchCustomerSuggestions}
                          defaultOptions
                          onChange={handleOrderChange}
                          value={{
                            value: orderData.customerName,
                            label: orderData.customerName,
                          }}
                          className="mt-1"
                          placeholder="Search for a customer"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status*
                        <Select
                          name="status"
                          options={statusOptions}
                          className="basic-single"
                          classNamePrefix="select"
                          value={statusOptions.find(
                            (option) => option.value === orderData.status
                          )}
                          onChange={handleStatusChange}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Items</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orderData.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ₹{item.price}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => editItem(index)}
                                  className="text-blue-500 hover:text-blue-700"
                                  type="button"
                                >
                                  <PencilIcon className="h-5 w-5 inline" />
                                </button>
                                <button
                                  onClick={() => removeItem(index)}
                                  className="text-red-500 hover:text-red-700 ml-2"
                                >
                                  <TrashIcon className="h-5 w-5 inline" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 items-center gap-5">
                        <Select
                          name="name"
                          options={predefinedItems}
                          className="basic-single"
                          classNamePrefix="select"
                          value={predefinedItems.find(
                            (option) => option.value === itemData.name
                          )}
                          onChange={handleItemChange}
                          placeholder="Select Item"
                        />
                        <input
                          type="number"
                          name="quantity"
                          value={itemData.quantity}
                          onChange={(e) =>
                            setItemData((prev) => ({
                              ...prev,
                              quantity: e.target.value,
                            }))
                          }
                          className="mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Quantity"
                        />
                      </div>
                      {currentItemIndex !== null ? (
                        <button
                          type="button"
                          onClick={updateItem}
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                          Update Item
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={addItem}
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hoverbg-indigo-700"
                        >
                          <PlusIcon className="h-5 w-5" />
                          Add Item
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Processing..."
                        : initialData
                        ? "Update"
                        : "Add"}{" "}
                      Order
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

export default OrderForm;
