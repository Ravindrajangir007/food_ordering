import React, { useState } from "react";
import Order from "./Order";
import OrderForm from "./OrderForm";
import PaymentModal from "../payments/PaymentModal";
import { PlusIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const initialOrders = [
  {
    id: 1,
    customerName: "John Doe",
    customerMobile: "9876543210",
    customerLocation: "Area 1",
    customerAddress: "123, Street Name, City",
    status: "Pending",
    items: [
      { name: "Breakfast Thali", quantity: 1, price: 150 },
      { name: "Coffee", quantity: 2, price: 50 },
    ],
    totalPrice: 250,
  },
  {
    id: 2,
    customerName: "Jane Smith",
    customerMobile: "9123456780",
    customerLocation: "Area 2",
    customerAddress: "456, Avenue Name, City",
    status: "Shipped",
    items: [{ name: "Lunch Thali", quantity: 1, price: 250 }],
    totalPrice: 250,
  },
];

const OrderList = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentVendor, setCurrentVendor] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddOrder = (order) => {
    setOrders((prev) => [...prev, { ...order, id: prev.length + 1 }]);
    setIsFormOpen(false);
  };

  const handleEditOrder = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
    setIsFormOpen(false);
  };

  const handleDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const handleEditClick = (order) => {
    setCurrentOrder(order);
    setIsFormOpen(true);
  };

  const handleViewPayments = (vendor) => {
    setCurrentVendor(vendor);
    setIsPaymentModalOpen(true);
  };

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setCurrentOrder(null);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Order
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search by customer name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <Order
                key={order.id}
                order={order}
                onEdit={handleEditClick}
                onDelete={handleDeleteOrder}
              />
            ))}
          </tbody>
        </table>
      </div>
      <OrderForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={currentOrder ? handleEditOrder : handleAddOrder}
        initialData={currentOrder}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        vendor={currentVendor}
      />
    </div>
  );
};

export default OrderList;
