import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Sample data for payments
const paymentsData = [
  { id: 1, amount: 5000, date: "2025-03-22", status: "Received" },
  { id: 2, amount: 3000, date: "2025-03-22", status: "Received" },
  { id: 3, amount: 4500, date: "2025-04-01", status: "Pending" },
  { id: 4, amount: 3500, date: "2025-04-10", status: "Pending" },
  // Add more payments here
];

const statusOptions = [
  { value: "All", label: "All" },
  { value: "Received", label: "Received" },
  { value: "Pending", label: "Pending" },
];

const PaymentList = () => {
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };

  const filteredPayments = paymentsData
    .filter((payment) => {
      const statusMatch =
        selectedStatus.value === "All" ||
        payment.status === selectedStatus.value;
      const dateMatch =
        (!startDate || new Date(payment.date) >= startDate) &&
        (!endDate || new Date(payment.date) <= endDate);
      return statusMatch && dateMatch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalReceived = filteredPayments
    .filter((payment) => payment.status === "Received")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const totalPending = filteredPayments
    .filter((payment) => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Total Received</h3>
          <p className="text-2xl font-semibold text-green-600">
            ₹{totalReceived}
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Total Pending</h3>
          <p className="text-2xl font-semibold text-yellow-600">
            ₹{totalPending}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={handleStatusChange}
          placeholder="Filter by Status"
        />
        <div className="flex space-x-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="w-full p-2 border rounded"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.date}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    payment.status === "Received"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentList;
