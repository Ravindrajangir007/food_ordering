import React, { useState } from "react";

const sampleCustomer = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  phone: "9876543210",
  total_orders: 15,
  avg_order_value: 300,
  wallet_balance: 1200,
  total_addresses: 3,
  orders: [
    { id: 101, date: "2024-05-01", amount: 250, status: "completed" },
    { id: 102, date: "2024-05-10", amount: 350, status: "completed" },
    // more orders...
  ],
  addresses: [
    {
      id: 1,
      line1: "123 Green Street",
      line2: "Suite 5",
      city: "Cityville",
      state: "Stateville",
      pincode: "560001",
    },
    {
      id: 2,
      line1: "456 Blue Avenue",
      line2: "",
      city: "Townsville",
      state: "Stateville",
      pincode: "560002",
    },
  ],
  wallet_history: [
    { id: 1, date: "2024-04-01", amount: 500, type: "credit" },
    { id: 2, date: "2024-04-15", amount: 200, type: "debit" },
    // more wallet transactions...
  ],
};

const CustomerDetails = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="w-full min-h-screen p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate">
          Customer Details - {sampleCustomer.name}
        </h2>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <div className="bg-yellow-50 rounded-xl p-6 text-center shadow">
          <p className="text-4xl font-extrabold text-yellow-600">
            {sampleCustomer.total_orders}
          </p>
          <p className="text-gray-700 mt-2 text-lg font-semibold">
            Total Orders
          </p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 text-center shadow">
          <p className="text-4xl font-extrabold text-yellow-600">
            ₹{sampleCustomer.avg_order_value}
          </p>
          <p className="text-gray-700 mt-2 text-lg font-semibold">
            Avg Order Value
          </p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 text-center shadow">
          <p className="text-4xl font-extrabold text-yellow-600">
            ₹{sampleCustomer.wallet_balance}
          </p>
          <p className="text-gray-700 mt-2 text-lg font-semibold">
            Wallet Balance
          </p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 text-center shadow">
          <p className="text-4xl font-extrabold text-yellow-600">
            {sampleCustomer.total_addresses}
          </p>
          <p className="text-gray-700 mt-2 text-lg font-semibold">
            Total Addresses
          </p>
        </div>
      </section>
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-10">
        {/* Tabs */}
        <nav className="flex border-b border-gray-300 mb-8 space-x-8">
          {[
            { id: "orders", label: "All Orders" },
            { id: "addresses", label: "All Addresses" },
            { id: "wallet", label: "Wallet History" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 font-semibold text-lg transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "text-yellow-600 border-b-4 border-yellow-500"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div>
          {activeTab === "orders" && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                All Orders
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Order ID", "Date", "Amount", "Status"].map(
                        (header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleCustomer.orders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-yellow-50 cursor-pointer transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          ₹{order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "addresses" && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                All Addresses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleCustomer.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50"
                  >
                    <p>
                      <span className="font-semibold">Address Line 1:</span>{" "}
                      {addr.line1}
                    </p>
                    <p>
                      <span className="font-semibold">Address Line 2:</span>{" "}
                      {addr.line2 || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">City:</span> {addr.city}
                    </p>
                    <p>
                      <span className="font-semibold">State:</span> {addr.state}
                    </p>
                    <p>
                      <span className="font-semibold">Pincode:</span>{" "}
                      {addr.pincode}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "wallet" && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Wallet History
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Transaction ID", "Date", "Amount", "Type"].map(
                        (header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleCustomer.wallet_history.map((tx) => (
                      <tr
                        key={tx.id}
                        className="hover:bg-yellow-50 cursor-pointer transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {tx.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                            tx.type === "credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                          {tx.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
