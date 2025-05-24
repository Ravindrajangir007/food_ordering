import React, { useState } from "react";

const sampleRequests = [
  {
    id: 1,
    business_name: "Fresh Fruits Co.",
    contact_person: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    city: "Cityville",
    latitude: 12.9716,
    longitude: 77.5946,
    email_verified: true,
    phone_verified: false,
    created_at: "2024-04-01T10:00:00Z",
    updated_at: "2024-04-05T12:00:00Z",
    status: "new",
  },
  {
    id: 2,
    business_name: "Organic Veggies Ltd.",
    contact_person: "Jane Smith",
    email: "jane@example.com",
    phone: "9123456780",
    city: "Townsville",
    latitude: 13.0827,
    longitude: 80.2707,
    email_verified: false,
    phone_verified: true,
    created_at: "2024-04-03T09:30:00Z",
    updated_at: "2024-04-06T11:00:00Z",
    status: "converted",
  },
  // Add more sample requests as needed
];

const VendorOnboardingRequests = () => {
  const [requests, setRequests] = useState(sampleRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [filterText, setFilterText] = useState("");

  const openModal = (request) => {
    setSelectedRequest(request);
    setNewStatus(request.status);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setNewStatus("");
  };

  const updateStatus = () => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest.id
          ? { ...req, status: newStatus, updated_at: new Date().toISOString() }
          : req
      )
    );
    closeModal();
  };

  // Filter requests based on filterText in business_name, contact_person, email, or city
  const filteredRequests = requests.filter((req) => {
    const search = filterText.toLowerCase();
    return (
      req.business_name.toLowerCase().includes(search) ||
      req.contact_person.toLowerCase().includes(search) ||
      req.email.toLowerCase().includes(search) ||
      req.city.toLowerCase().includes(search)
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate mb-8">
        Vendor Onboarding Requests
      </h1>

      {/* Filter Input */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white w-full p-4 rounded-xl">
        <input
          type="text"
          placeholder="Filter by Business Name, Contact Person, Email or City..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="overflow-x-auto border border-gray-200 bg-white p-2 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Business Name",
                "Contact Person",
                "Email",
                "Phone",
                "City",

                "Created At",
                "Updated At",
                "Status",
                "Actions",
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
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-yellow-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {req.business_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.contact_person}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req.city}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(req.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(req.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === "new"
                          ? "bg-blue-100 text-blue-700"
                          : req.status === "converted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => openModal(req)}
                      className="text-yellow-600 hover:text-yellow-800 font-semibold"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="text-center py-8 text-gray-500 italic text-sm"
                >
                  No onboarding requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              Update Status for {selectedRequest.business_name}
            </h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="new">New</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={updateStatus}
                className="px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorOnboardingRequests;
