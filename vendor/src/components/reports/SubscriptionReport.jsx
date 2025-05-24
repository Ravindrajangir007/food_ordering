import { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  ArrowDownTrayIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const dateRanges = [
  { id: "week", name: "Last 7 Days" },
  { id: "month", name: "Last 30 Days" },
  { id: "quarter", name: "Last 3 Months" },
  { id: "year", name: "This Year" },
];

export default function SubscriptionReport() {
  const [dateRange, setDateRange] = useState("month");
  const currentUser = "Ravindrajangir007";

  // Mock data for subscription trends
  const subscriptionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Active Subscriptions",
        data: [450, 480, 500, 520],
        borderColor: "rgb(79, 70, 229)",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
      },
    ],
  };

  // Mock data for plan distribution
  const planDistribution = {
    labels: ["Basic Plan", "Standard Plan", "Premium Plan"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: [
          "rgba(79, 70, 229, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
        ],
      },
    ],
  };

  // Options for line chart
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Subscription Growth Trend",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Options for pie chart
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Subscription Plan Distribution",
      },
    },
  };

  return (
    <div className="">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Subscription Report
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Analysis of subscription performance and trends
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {dateRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Subscribers
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      520
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-yellow-600">
                      <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-yellow-500" />
                      <span className="ml-1">8.2%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyRupeeIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Monthly Revenue
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      ₹1,25,000
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-yellow-600">
                      <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-yellow-500" />
                      <span className="ml-1">12.5%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Plan Value
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      ₹2,400
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <ArrowTrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                      <span className="ml-1">12.5%</span>
                    </div>
                  </dd>
                </dl>
              </div>

              <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                <ArrowTrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                <span className="ml-1">2.3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Churn Rate
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    2.5%
                  </div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-yellow-600">
                    <ArrowTrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-yellow-500" />
                    <span className="ml-1">0.5%</span>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <Line data={subscriptionData} options={lineOptions} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <Pie data={planDistribution} options={pieOptions} />
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Subscription Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Plan-wise Stats */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  Plan Distribution
                </h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Basic Plan
                      </span>
                      <span className="text-sm text-gray-500">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Standard Plan
                      </span>
                      <span className="text-sm text-gray-500">50%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Premium Plan
                      </span>
                      <span className="text-sm text-gray-500">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retention Stats */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  Retention Metrics
                </h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-900">
                        Renewal Rate
                      </span>
                      <span className="text-lg font-semibold text-yellow-600">
                        85%
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-900">
                        Avg. Subscription Length
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        8.5 months
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-900">
                        Customer Satisfaction
                      </span>
                      <span className="text-lg font-semibold text-yellow-600">
                        4.5/5.0
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Metrics */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  Growth Metrics
                </h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-900">
                        New Subscribers
                      </span>
                      <div className="flex items-baseline">
                        <span className="text-lg font-semibold text-gray-900 mr-2">
                          45
                        </span>
                        <span className="text-sm text-yellow-600">+12%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-900">
                        Upgrade Rate
                      </span>
                      <div className="flex items-baseline">
                        <span className="text-lg font-semibold text-gray-900 mr-2">
                          15%
                        </span>
                        <span className="text-sm text-yellow-600">+3%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-900">
                        Revenue Growth
                      </span>
                      <div className="flex items-baseline">
                        <span className="text-lg font-semibold text-gray-900 mr-2">
                          18%
                        </span>
                        <span className="text-sm text-yellow-600">+5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-4 text-sm text-gray-500 text-right">
          Last updated: 2025-03-27 09:37:58 UTC by {currentUser}
        </div>
      </div>
    </div>
  );
}
