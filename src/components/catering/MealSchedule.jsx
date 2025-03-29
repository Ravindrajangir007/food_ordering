import { useState } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const schedules = [
  {
    id: 1,
    date: "2025-03-27",
    mealType: "Lunch",
    time: "12:30 PM - 02:00 PM",
    totalOrders: 450,
    status: "upcoming",
    location: "Main Cafeteria",
    specialRequirements: [
      { type: "Vegetarian", count: 300 },
      { type: "Non-Vegetarian", count: 150 },
      { type: "Jain", count: 20 },
    ],
  },
  {
    id: 2,
    date: "2025-03-27",
    mealType: "Snacks",
    time: "04:30 PM - 05:30 PM",
    totalOrders: 380,
    status: "in-progress",
    location: "Main Cafeteria",
    specialRequirements: [
      { type: "Regular", count: 350 },
      { type: "Sugar-Free", count: 30 },
    ],
  },
  // Add more schedules...
];

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-yellow-100 text-yellow-800";
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "completed":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case "in-progress":
      return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
    case "cancelled":
      return <XCircleIcon className="h-5 w-5 text-red-500" />;
    default:
      return <ClockIcon className="h-5 w-5 text-blue-500" />;
  }
};

export default function MealSchedule() {
  return (
    <div className="">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Meal Schedule</h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage today's meal schedules
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <CalendarDaysIcon className="-ml-1 mr-2 h-5 w-5" />
            View Calendar
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {schedule.mealType}
                  </h3>
                  <span
                    className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      schedule.status
                    )}`}
                  >
                    {schedule.status.charAt(0).toUpperCase() +
                      schedule.status.slice(1)}
                  </span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <ClockIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                  {schedule.time}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <UsersIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                  {schedule.totalOrders} orders
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-500">{schedule.location}</div>
                <div
                  className="mt

-2"
                >
                  {getStatusIcon(schedule.status)}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">
                Special Requirements
              </h4>
              <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {schedule.specialRequirements.map((req, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg border border-gray-200 bg-white px-4 py-3"
                  >
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {req.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {req.count} orders
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View Details
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
