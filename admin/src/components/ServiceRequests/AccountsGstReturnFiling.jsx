// AccountsGstReturnFiling.js
import React, { useState, useMemo } from "react";

const sampleData = [
  {
    id: 1,
    restaurant_name: "Green Leaf Restaurant",
    mobile_no: "9876543210",
    email: "contact@greenleaf.com",
    city: "Cityville",
    message: "Need help with registration process.",
    created_at: "2024-05-01T10:00:00Z",
  },
  {
    id: 2,
    restaurant_name: "Spice Hub",
    mobile_no: "9123456780",
    email: "hr@spicehub.com",
    city: "Townsville",
    message: "Inquiry about GST filing.",
    created_at: "2024-04-20T09:30:00Z",
  },
  // Add more sample entries as needed
];

const AccountsGstReturnFiling = () => {
  const [filterText, setFilterText] = useState("");

  const filteredData = useMemo(() => {
    const search = filterText.toLowerCase();
    return sampleData.filter(
      (item) =>
        item.restaurant_name.toLowerCase().includes(search) ||
        item.mobile_no.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.city.toLowerCase().includes(search) ||
        item.message.toLowerCase().includes(search)
    );
  }, [filterText]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate mb-8">
        Accounts & Gst Return Filing
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white w-full p-4 rounded-xl">
        <input
          type="text"
          placeholder="Filter by Restaurant, Mobile, Email, City or Message..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="mb-6 w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          autoComplete="off"
        />
      </div>

      <div className="overflow-x-auto border border-gray-200 bg-white p-2 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Restaurant Name",
                "Mobile No",
                "Email",
                "City",
                "Message",
                "Created At",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-yellow-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.restaurant_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.mobile_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                    {item.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500 italic text-sm"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsGstReturnFiling;
