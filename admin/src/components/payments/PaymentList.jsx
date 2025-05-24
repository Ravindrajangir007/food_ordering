import React, { useEffect, useState } from "react";
import { format, subDays, parseISO } from "date-fns";
import {
  CurrencyRupeeIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { fetchPaymentDashboard } from "../../services/paymentService";
import LoadingSpinner from "../common/LoadingSpinner";
import toast from "react-hot-toast";

// Sample payment data
// const paymentData = {
//   vendorId: "V001",
//   vendorName: "Restaurant Name",
//   totalEarnings: 125000,
//   pendingAmount: 45000,
//   lastSettlement: "2025-03-25",
//   bankDetails: {
//     accountName: "Vendor Name",
//     accountNumber: "XXXXXXXX1234",
//     bankName: "HDFC Bank",
//     ifscCode: "HDFC0001234",
//   },
//   settlements: [
//     {
//       id: 1,
//       amount: 15000,
//       ordersCount: 45,
//       settlementDate: "2025-03-25",
//       status: "completed", // completed, pending, processing
//       periodStart: "2025-03-15",
//       periodEnd: "2025-03-25",
//       transactionId: "TXN123456",
//     },
//     // Add more settlements...
//   ],
//   pendingSettlements: [
//     {
//       id: 101,
//       amount: 25000,
//       ordersCount: 52,
//       dueDate: "2025-04-05",
//       periodStart: "2025-03-26",
//       periodEnd: "2025-04-05",
//     },

//     // Add more pending settlements...
//   ],
//   recentOrders: [
//     {
//       id: 1001,
//       orderId: "ORD123",
//       amount: 550,
//       orderDate: "2025-04-01",
//       settlementDue: "2025-04-11",
//       status: "pending", // pending, settled
//     },
//     // Add more orders...
//   ],
// };

const Payments = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({});

  console.log("object", paymentData);

  const loadPaymentDashboard = async () => {
    try {
      setLoading(true);
      const response = await fetchPaymentDashboard();

      if (response.success) {
        setPaymentData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch payment dashboard");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaymentDashboard();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your earnings, settlements, and pending payments
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{paymentData.totalEarnings.toLocaleString()}
                </p>
              </div>
              <CurrencyRupeeIcon className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{paymentData.pendingAmount.toLocaleString()}
                </p>
              </div>
              <ClockIcon className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Next Settlement</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹
                  {paymentData.pendingSettlements[0]?.amount.toLocaleString() ||
                    0}
                </p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Due:{" "}
              {format(
                parseISO(paymentData.pendingSettlements[0]?.dueDate),
                "MMM d, yyyy"
              )}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Last Settlement</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{paymentData.settlements[0]?.amount.toLocaleString() || 0}
                </p>
              </div>
              <ArrowTrendingUpIcon className="h-8 w-8 text-indigo-500" />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              On: {format(parseISO(paymentData.lastSettlement), "MMM d, yyyy")}
            </p>
          </div>
        </div>

        {/* Bank Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Bank Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Account Name</p>
              <p className="text-sm font-medium text-gray-900">
                {paymentData.bankDetails.accountName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="text-sm font-medium text-gray-900">
                {paymentData.bankDetails.accountNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bank Name</p>
              <p className="text-sm font-medium text-gray-900">
                {paymentData.bankDetails.bankName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">IFSC Code</p>
              <p className="text-sm font-medium text-gray-900">
                {paymentData.bankDetails.ifscCode}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 text-sm font-medium cursor-pointer ${
                  activeTab === "overview"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Pending Settlements
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium cursor-pointer ${
                  activeTab === "history"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("history")}
              >
                Settlement History
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium cursor-pointer ${
                  activeTab === "orders"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                Recent Orders
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Orders
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentData.pendingSettlements.map((settlement) => (
                      <tr key={settlement.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {format(parseISO(settlement.periodStart), "MMM d")} -{" "}
                          {format(
                            parseISO(settlement.periodEnd),
                            "MMM d, yyyy"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {settlement.ordersCount} orders
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{settlement.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(parseISO(settlement.dueDate), "MMM d, yyyy")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "history" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Settlement Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Transaction ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentData.settlements.map((settlement) => (
                      <tr key={settlement.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {format(
                            parseISO(settlement.settlementDate),
                            "MMM d, yyyy"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(parseISO(settlement.periodStart), "MMM d")} -{" "}
                          {format(
                            parseISO(settlement.periodEnd),
                            "MMM d, yyyy"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{settlement.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              settlement.status === "completed"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {settlement.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {settlement.transactionId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Order Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Settlement Due
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentData.recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{order.orderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(parseISO(order.orderDate), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{order.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(parseISO(order.settlementDue), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              order.status === "settled"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Payments;
