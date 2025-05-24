import React from "react";
import {
  ChartBarIcon,
  CurrencyRupeeIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const Stats = ({ stats }) => {
  // Return null or a loading placeholder if stats is not available
  if (!stats) {
    return <div>Loading stats...</div>;
  }

  const statCards = [
    {
      name: "Total Revenue",
      value: stats.totalRevenue.value,
      change: stats.totalRevenue.change,
      changeType: stats.totalRevenue.changeType,
      period: stats.totalRevenue.period,
      icon: CurrencyRupeeIcon,
    },
    {
      name: "Active Users",
      value: stats.activeUsers.value,
      change: stats.activeUsers.change,
      changeType: stats.activeUsers.changeType,
      period: stats.activeUsers.period,
      icon: UsersIcon,
    },
    {
      name: "Daily Orders",
      value: stats.dailyOrders?.value || "N/A", // Optional chaining for safety
      change: stats.dailyOrders?.change || "N/A",
      changeType: stats.dailyOrders?.changeType || "neutral",
      period: stats.dailyOrders?.period || "N/A",
      icon: ShoppingCartIcon,
    },
    {
      name: "Total Received Payment",
      value: stats.retailSales?.value || "N/A", // Optional chaining for safety
      change: stats.retailSales?.change || "N/A",
      changeType: stats.retailSales?.changeType || "neutral",
      period: stats.retailSales?.period || "N/A",
      icon: ChartBarIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-2 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === "increase"
                          ? "text-yellow-600"
                          : stat.changeType === "decrease"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {stat.changeType === "increase" ? (
                        <svg
                          className="self-center flex-shrink-0 h-5 w-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : stat.changeType === "decrease" ? (
                        <svg
                          className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : null}
                      <span className="sr-only">
                        {stat.changeType === "increase"
                          ? "Increased by"
                          : stat.changeType === "decrease"
                          ? "Decreased by"
                          : ""}
                      </span>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
