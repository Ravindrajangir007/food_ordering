import { useState, useEffect } from "react";
import axios from "axios";
import { CalendarIcon } from "@heroicons/react/24/outline";
import Stats from "./Stats";
import { Line, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { config } from "../../constant/global";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const API_URL = config.API_BASE_URL;

  // State for stats and chart data
  const [stats, setStats] = useState(null);
  const [revenueTrend, setRevenueTrend] = useState(null);
  const [dailyOrders, setDailyOrders] = useState(null);
  const [activeUsersTrend, setActiveUsersTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use Promise.all to fetch all data in parallel
        const [statsResponse, revenueResponse, ordersResponse, usersResponse] =
          await Promise.all([
            axios.get(`${API_URL}/dashboard/stats`),
            axios.get(`${API_URL}/dashboard/revenue-trend`),
            axios.get(`${API_URL}/dashboard/daily-orders`),
            axios.get(`${API_URL}/dashboard/active-users-trend`),
          ]);

        // Update state with the fetched data
        setStats(statsResponse.data.data);

        setRevenueTrend(revenueResponse.data.data);
        setDailyOrders(ordersResponse.data.data);
        setActiveUsersTrend(usersResponse.data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  // Prepare chart data
  const prepareRevenueData = () => {
    if (!revenueTrend) return null;
    const labels = Object.keys(revenueTrend).map((week) => `Week ${week}`);
    const data = Object.values(revenueTrend);

    return {
      labels,
      datasets: [
        {
          label: "Revenue (₹)",
          data,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          tension: 0.4,
        },
      ],
    };
  };

  const prepareOrdersData = () => {
    if (!dailyOrders) return null;
    const labels = Object.keys(dailyOrders);
    const data = Object.values(dailyOrders);

    return {
      labels,
      datasets: [
        {
          label: "Daily Orders",
          data,
          backgroundColor: "#2196F3",
          borderColor: "#2196F3",
          borderWidth: 1,
        },
      ],
    };
  };

  const prepareUsersData = () => {
    if (!activeUsersTrend) return null;
    const labels = Object.keys(activeUsersTrend).map(
      (month) => `Month ${month}`
    );
    const data = Object.values(activeUsersTrend);

    return {
      labels,
      datasets: [
        {
          label: "Active Users",
          data,
          backgroundColor: "#FF9800",
          borderColor: "#FF9800",
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen py-4 px-2 sm:px-4 lg:px-4">
      {/* Dashboard Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Vendor Dashboard
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8">
        <Stats stats={stats} />
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Revenue Trend
          </h3>
          <div className="h-64">
            <Line
              data={prepareRevenueData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* Daily Orders */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Daily Orders
          </h3>
          <div className="h-64">
            <Bar
              data={prepareOrdersData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Active Users
          </h3>
          <div className="h-80">
            <Bar
              data={prepareUsersData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
