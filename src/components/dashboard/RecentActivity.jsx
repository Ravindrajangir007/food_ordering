import { useState } from "react";
import { format } from "date-fns";
import {
  ShoppingCartIcon,
  UserPlusIcon,
  CurrencyRupeeIcon,
  ExclamationCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const RecentActivity = () => {
  // Mock data - will be replaced with API data later
  const [activities] = useState([
    {
      id: 1,
      type: "order",
      title: "New catering order received",
      description: "Order #1234 - Class 10A Lunch",
      amount: "₹4,500",
      timestamp: "2025-03-27T05:15:00Z",
      status: "pending",
      user: "Class 10A Representative",
    },
    {
      id: 2,
      type: "subscription",
      title: "New subscription plan purchased",
      description: "Monthly Plan - Student Package",
      amount: "₹2,000",
      timestamp: "2025-03-27T05:10:00Z",
      status: "completed",
      user: "John Doe",
    },
    {
      id: 3,
      type: "retail",
      title: "Retail store transaction",
      description: "POS Sale - Snacks and Beverages",
      amount: "₹350",
      timestamp: "2025-03-27T05:05:00Z",
      status: "completed",
      user: "Jane Smith",
    },
    {
      id: 4,
      type: "alert",
      title: "Low stock alert",
      description: "Inventory running low for: Soft Drinks",
      timestamp: "2025-03-27T05:00:00Z",
      status: "warning",
    },
    {
      id: 5,
      type: "order",
      title: "Bulk order confirmed",
      description: "Staff Meeting Refreshments",
      amount: "₹7,500",
      timestamp: "2025-03-27T04:55:00Z",
      status: "completed",
      user: "Admin Staff",
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCartIcon className="h-6 w-6" />;
      case "subscription":
        return <UserPlusIcon className="h-6 w-6" />;
      case "retail":
        return <CurrencyRupeeIcon className="h-6 w-6" />;
      case "alert":
        return <ExclamationCircleIcon className="h-6 w-6" />;
      default:
        return <ClockIcon className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "warning":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="p-4 sm:p-6 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex-shrink-0 rounded-md p-2 ${
                    activity.type === "alert" ? "bg-red-100" : "bg-indigo-100"
                  }`}
                >
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                  {activity.user && (
                    <p className="text-sm text-gray-500">by {activity.user}</p>
                  )}
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {activity.amount && (
                    <span className="text-sm font-medium text-gray-900">
                      {activity.amount}
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      activity.status
                    )}`}
                  >
                    {activity.status}
                  </span>
                  <time
                    dateTime={activity.timestamp}
                    className="text-xs text-gray-500"
                  >
                    {format(new Date(activity.timestamp), "HH:mm")}
                  </time>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-lg">
        <div className="flex justify-center">
          <button
            type="button"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
