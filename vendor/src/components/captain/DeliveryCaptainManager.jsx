import React, { useState } from "react";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import CaptainForm from "./CaptainForm";

// Sample initial data for delivery captains
const initialCaptains = [
  {
    id: 1,
    name: "Captain 1",
    email: "captain1@example.com",
    phone: "9876543210",
    gender: "Male",
    vehicle: "Bike",
    vehicleNumber: "MH12AB1234",
    area: "Area 1",
    totalOrdersServed: 150,
    addedAt: "2025-01-15T10:00:00Z",
    addedBy: "admin",
  },
  {
    id: 2,
    name: "Captain 2",
    email: "captain2@example.com",
    phone: "9123456780",
    gender: "Female",
    vehicle: "Scooter",
    vehicleNumber: "MH12CD5678",
    area: "Area 2",
    totalOrdersServed: 200,
    addedAt: "2025-01-16T11:00:00Z",
    addedBy: "admin",
  },
];

const DeliveryCaptainManager = () => {
  const [captains, setCaptains] = useState(initialCaptains);
  const [currentCaptain, setCurrentCaptain] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddCaptain = (captain) => {
    if (captain.id) {
      setCaptains((prev) =>
        prev.map((c) => (c.id === captain.id ? captain : c))
      );
    } else {
      setCaptains((prev) => [
        ...prev,
        {
          ...captain,
          id: prev.length + 1,
          addedAt: new Date().toISOString(),
          addedBy: "Ravindrajangir007",
        },
      ]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteCaptain = (id) => {
    setCaptains((prev) => prev.filter((captain) => captain.id !== id));
  };

  const handleEditCaptain = (captain) => {
    setCurrentCaptain(captain);
    setIsFormOpen(true);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Manage Delivery Captains
        </h2>

        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 mb-4 cursor-pointer"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Captain
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Captain ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Area
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Orders Served
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {captains.map((captain) => (
              <tr key={captain.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {captain.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {captain.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {captain.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {captain.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {captain.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {captain.vehicle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {captain.vehicleNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {captain.area}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {captain.totalOrdersServed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(captain.addedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {captain.addedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditCaptain(captain)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                  >
                    <PencilIcon className="h-5 w-5 inline" />
                  </button>
                  <button
                    onClick={() => handleDeleteCaptain(captain.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 ml-2 cursor-pointer"
                  >
                    <TrashIcon className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CaptainForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddCaptain}
        initialData={currentCaptain}
      />
    </div>
  );
};

export default DeliveryCaptainManager;
