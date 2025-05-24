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
  // Static sample data for admin dashboard
  const stats = [
    { title: "Daily Schedules", value: 25 },
    { title: "Daily Orders", value: 450 },
    { title: "Total Vendors", value: 120 },
    { title: "Total Customers", value: 3200 },
    { title: "Customers Wallet Amount", value: "₹1,200,000" },
    { title: "Total Revenue", value: "₹1,250,000" },
    { title: "Daily Revenue", value: "₹45,000" },
    { title: "Avg Order Value", value: "₹1,200" },
  ];

  // Chart data for revenue trend (weekly)
  const revenueTrend = {
    1: 150000,
    2: 180000,
    3: 170000,
    4: 200000,
    5: 190000,
  };

  // Chart data for daily orders (per day of week)
  const dailyOrders = {
    Mon: 400,
    Tue: 450,
    Wed: 420,
    Thu: 480,
    Fri: 460,
    Sat: 500,
    Sun: 430,
  };

  // Chart data for active vendors over months
  const activeVendorsTrend = {
    1: 100,
    2: 105,
    3: 110,
    4: 115,
    5: 120,
    6: 125,
  };

  // Prepare chart data
  const prepareRevenueData = () => {
    const labels = Object.keys(revenueTrend).map((week) => `Week ${week}`);
    const data = Object.values(revenueTrend);

    return {
      labels,
      datasets: [
        {
          label: "Revenue (₹)",
          data,
          borderColor: "#2563EB", // Blue-600
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          tension: 0.3,
        },
      ],
    };
  };

  const prepareOrdersData = () => {
    const labels = Object.keys(dailyOrders);
    const data = Object.values(dailyOrders);

    return {
      labels,
      datasets: [
        {
          label: "Daily Orders",
          data,
          backgroundColor: "#10B981", // Green-500
          borderColor: "#10B981",
          borderWidth: 1,
        },
      ],
    };
  };

  const prepareVendorsData = () => {
    const labels = Object.keys(activeVendorsTrend).map(
      (month) => `Month ${month}`
    );
    const data = Object.values(activeVendorsTrend);

    return {
      labels,
      datasets: [
        {
          label: "Active Vendors",
          data,
          backgroundColor: "#F59E0B", // Amber-500
          borderColor: "#F59E0B",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="min-h-screen p-4">
      {/* Dashboard Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate">
            Admin Dashboard
          </h2>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            Last updated: {new Date().toLocaleString()}
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
        <section className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Trend
          </h3>
          <div className="h-64">
            <Line
              data={prepareRevenueData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: { display: false },
                },
              }}
            />
          </div>
        </section>

        {/* Daily Orders */}
        <section className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Orders
          </h3>
          <div className="h-64">
            <Bar
              data={prepareOrdersData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: { display: false },
                },
              }}
            />
          </div>
        </section>

        {/* Active Vendors */}
        <section className="bg-white shadow rounded-lg p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Active Vendors Over Time
          </h3>
          <div className="h-80">
            <Bar
              data={prepareVendorsData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: { display: false },
                },
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
