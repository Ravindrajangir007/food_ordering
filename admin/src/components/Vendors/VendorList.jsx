import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const VendorList = () => {
  const vendors = [
    {
      id: 1,
      business_name: "Fresh Fruits Co.",
      owner_name: "John Doe",
      phone: "9876543210",
      email: "john@example.com",
      city: "Cityville",
      state: "Stateville",
      status: "active",
      created_at: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      business_name: "Organic Veggies Ltd.",
      owner_name: "Jane Smith",
      phone: "9123456780",
      email: "jane@example.com",
      city: "Townsville",
      state: "Stateville",
      status: "inactive",
      created_at: "2023-12-20T09:30:00Z",
    },
    // Add more vendors as needed
  ];

  const [filters, setFilters] = useState({
    businessName: "",
    phone: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesBusinessName = vendor.business_name
        .toLowerCase()
        .includes(filters.businessName.toLowerCase());
      const matchesPhone = vendor.phone
        .toLowerCase()
        .includes(filters.phone.toLowerCase());
      return matchesBusinessName && matchesPhone;
    });
  }, [vendors, filters]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate mb-8">
        Vendor List
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white w-full p-4 rounded-xl">
        <input
          type="text"
          name="businessName"
          value={filters.businessName}
          onChange={handleFilterChange}
          placeholder="Filter by Business Name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg max-w-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          autoComplete="off"
        />
        <input
          type="tel"
          name="phone"
          value={filters.phone}
          onChange={handleFilterChange}
          placeholder="Filter by Mobile Number"
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
                "ID",
                "Business Name",
                "Owner Name",
                "Phone",
                "Email",
                "City",
                "State",
                "Status",
                "Created At",
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
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="hover:bg-yellow-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vendor.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vendor.business_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vendor.owner_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vendor.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vendor.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vendor.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {vendor.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        vendor.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {vendor.status.charAt(0).toUpperCase() +
                        vendor.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(vendor.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      to="/vendorDetail"
                      className="w-10 h-10 flex justify-center items-center bg-yellow-500 rounded-xl text-white"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-8 text-gray-500 italic text-sm"
                >
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorList;
