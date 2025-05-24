import React, { useState, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const sampleCustomers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "9876543210",
    total_orders: 15,
    last_order_value: 450,
    wallet_balance: 1200,
    total_addresses: 3,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "9123456780",
    total_orders: 8,
    last_order_value: 320,
    wallet_balance: 500,
    total_addresses: 1,
  },
  // Add more sample customers as needed
];

const Customers = () => {
  const [filters, setFilters] = useState({
    nameEmailPhone: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCustomers = useMemo(() => {
    const search = filters.nameEmailPhone.toLowerCase();
    return sampleCustomers.filter(
      (cust) =>
        cust.name.toLowerCase().includes(search) ||
        cust.email.toLowerCase().includes(search) ||
        cust.phone.toLowerCase().includes(search)
    );
  }, [filters]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate mb-8">
        Customers
      </h1>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white w-full p-4 rounded-xl">
        <input
          type="text"
          name="nameEmailPhone"
          value={filters.nameEmailPhone}
          onChange={handleFilterChange}
          placeholder="Filter by Name, Email or Mobile Number"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg max-w-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          autoComplete="off"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 bg-white p-2 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Email",
                "Mobile No",
                "Total Orders",
                "Last Order Value",
                "Wallet Balance",
                "Total Addresses",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-yellow-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cust.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cust.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cust.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cust.total_orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ₹{cust.last_order_value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ₹{cust.wallet_balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cust.total_addresses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      to="/customerDetail"
                      className="w-10 h-10 flex justify-center items-center bg-yellow-500 rounded-xl text-white hover:bg-yellow-600"
                      aria-label={`View details for ${cust.name}`}
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-8 text-gray-500 italic text-sm"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
