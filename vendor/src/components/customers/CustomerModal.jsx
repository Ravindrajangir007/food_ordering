import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const CustomerModal = ({ isOpen, onClose, customer, orders }) => {
  const [activeTab, setActiveTab] = useState("details"); // State to manage active tab

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Customer Details
                </Dialog.Title>
                <div className="mt-4">
                  {customer && (
                    <>
                      {/* Tabs */}
                      <div className="flex border-b border-gray-200">
                        <button
                          className={`py-2 px-4 text-sm font-medium ${
                            activeTab === "details"
                              ? "border-b-2 border-indigo-500 text-indigo-600"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={() => setActiveTab("details")}
                        >
                          Customer Details
                        </button>
                        <button
                          className={`py-2 px-4 text-sm font-medium ${
                            activeTab === "orders"
                              ? "border-b-2 border-indigo-500 text-indigo-600"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={() => setActiveTab("orders")}
                        >
                          Order History
                        </button>
                      </div>

                      {/* Tab Content */}
                      {activeTab === "details" && (
                        <div className="bg-gray-50 p-6 rounded-lg mt-5 mb-6 shadow-inner">
                          <p className="mb-2">
                            <strong>Name:</strong> {customer.name}
                          </p>
                          <p className="mb-2">
                            <strong>Email:</strong> {customer.email}
                          </p>
                          <p className="mb-2">
                            <strong>Phone:</strong> {customer.phone}
                          </p>
                          <p className="mb-2">
                            <strong>Address:</strong> {customer.address}
                          </p>
                          <p className="mb-2">
                            <strong>Registered At:</strong>{" "}
                            {customer.registeredAt}
                          </p>
                        </div>
                      )}

                      {activeTab === "orders" && (
                        <div className="bg-gray-50 p-3 rounded-lg mt-5 mb-6 shadow-inner">
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order Date
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Amount
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                  <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {order.orderDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {order.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {order.items.join(", ")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      ₹{order.totalAmount.toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomerModal;
