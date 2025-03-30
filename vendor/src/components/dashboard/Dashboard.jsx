import { useState } from "react";
import Stats from "./Stats";
import RecentActivity from "./RecentActivity";
import {
  ChartBarIcon,
  UsersIcon,
  ShoppingCartIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  // Mock data - will be replaced with API data later
  const [stats] = useState({
    totalRevenue: {
      value: "₹2,45,000",
      change: "+12.5%",
      changeType: "increase",
      period: "vs last month",
    },
    activeSubscriptions: {
      value: "850",
      change: "+8.2%",
      changeType: "increase",
      period: "vs last month",
    },
    dailyOrders: {
      value: "245",
      change: "-2.3%",
      changeType: "decrease",
      period: "vs yesterday",
    },
    retailSales: {
      value: "₹32,000",
      change: "+5.1%",
      changeType: "increase",
      period: "vs yesterday",
    },
  });

  return (
    <div className="min-h-screen py-4">
      {/* Dashboard Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard Overview
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              Last updated: 2025-03-27 05:29:56 UTC
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <Stats stats={stats} />

      {/* Activity Section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Recent Activity
        </h3>
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
