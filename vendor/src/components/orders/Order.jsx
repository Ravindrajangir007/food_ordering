import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const Order = ({ order, onEdit, onDelete }) => {
  const [isItemsVisible, setIsItemsVisible] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Shipped":
        return "bg-blue-500 text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <>
      <tr>
        <td
          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          onClick={() => setIsItemsVisible(!isItemsVisible)}
        >
          {order.id}
        </td>
        <td
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          onClick={() => setIsItemsVisible(!isItemsVisible)}
        >
          <div className="flex flex-col gap-2">
            <span>{order.customerName}</span>
            <span>{order.customerMobile}</span>
          </div>
        </td>
        <td
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          onClick={() => setIsItemsVisible(!isItemsVisible)}
        >
          <div className="flex flex-col gap-2">
            <span>{order.customerAddress}</span>
            <span>{order.customerLocation}</span>
          </div>
        </td>
        <td
          className={`px-6 py-4 whitespace-nowrap text-sm`}
          onClick={() => setIsItemsVisible(!isItemsVisible)}
        >
          <span
            className={`${getStatusColor(order.status)} px-3 py-0.5 rounded-sm`}
          >
            {order.status}
          </span>
        </td>
        <td
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          onClick={() => setIsItemsVisible(!isItemsVisible)}
        >
          ₹{order.totalPrice}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => onEdit(order)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(order.id)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 ml-2 cursor-pointer"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </td>
      </tr>
      {isItemsVisible && (
        <tr>
          <td colSpan="6" className="px-6 py-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-lg font-medium text-gray-900 mb-2 mt-4">
                Items
              </h4>
              <ul className="list-inside">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-500">
                    {item.name} - {item.quantity} pcs - ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default Order;
