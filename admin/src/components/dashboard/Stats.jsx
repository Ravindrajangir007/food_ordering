import React from "react";
import {
  ChartBarIcon,
  CurrencyRupeeIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  "Total Revenue": CurrencyRupeeIcon,
  "Total Vendors": UsersIcon,
  "Total Orders": ShoppingCartIcon,
  "Total Customers": ChartBarIcon,
};

const Stats = ({ stats }) => {
  if (!stats) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ title, value }) => {
        const Icon = iconMap[title] || ChartBarIcon;
        return (
          <div
            key={title}
            className="bg-white overflow-hidden shadow rounded-lg p-5 flex items-center"
          >
            <div className="flex-shrink-0">
              <Icon className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">{value}</dd>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
