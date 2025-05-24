import React, { useState } from "react";

const sampleStaffingRequests = [
  {
    id: 1,
    restaurant_name: "Green Leaf Restaurant",
    email: "contact@greenleaf.com",
    contact_no: "9876543210",
    city: "Cityville",
    address: "123 Green Street, Cityville",
    jobs: [
      {
        id: 101,
        type_of_staff: "Chef",
        number_of_staff: 2,
        salary_range: "20,000 - 30,000",
        job_details: "Experienced in Italian cuisine",
      },
      {
        id: 102,
        type_of_staff: "Waiter",
        number_of_staff: 4,
        salary_range: "10,000 - 15,000",
        job_details: "",
      },
    ],
    created_at: "2024-05-01T10:00:00Z",
    updated_at: "2024-05-05T12:00:00Z",
  },
  {
    id: 2,
    restaurant_name: "Spice Hub",
    email: "hr@spicehub.com",
    contact_no: "9123456780",
    city: "Townsville",
    address: "456 Spice Avenue, Townsville",
    jobs: [
      {
        id: 201,
        type_of_staff: "Cook",
        number_of_staff: 3,
        salary_range: "18,000 - 25,000",
        job_details: "Must know Indian spices",
      },
    ],
    created_at: "2024-04-20T09:30:00Z",
    updated_at: "2024-04-25T11:00:00Z",
  },
];

const StaffingRequest = () => {
  const [requests, setRequests] = useState(sampleStaffingRequests);
  const [expandedRequestId, setExpandedRequestId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedRequestId(expandedRequestId === id ? null : id);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold leading-7 text-gray-900  mb-8">
        Staffing Requests
      </h1>
      {requests.length === 0 && (
        <div className="overflow-x-auto border border-gray-200 bg-white p-2 rounded-xl">
          <p className="text-center text-gray-500 italic">
            No staffing requests found.
          </p>
        </div>
      )}
      <div className="space-y-2">
        {requests.map((req) => (
          <div
            key={req.id}
            className="overflow-x-auto border border-gray-200 bg-white p-4 rounded-xl cursor-pointer"
          >
            <div
              className="flex justify-between items-center"
              onClick={() => toggleExpand(req.id)}
            >
              <div>
                <h2 className="text-xl font-semibold text-yellow-600">
                  {req.restaurant_name}
                </h2>
                <p className="text-gray-700">{req.city}</p>
                <p className="text-gray-600 text-sm">
                  {req.email} | {req.contact_no}
                </p>
                <p className="text-gray-600 text-sm truncate max-w-lg">
                  {req.address}
                </p>
              </div>
              <button
                className="text-yellow-600 font-bold text-2xl select-none"
                aria-label={
                  expandedRequestId === req.id
                    ? "Collapse details"
                    : "Expand details"
                }
              >
                {expandedRequestId === req.id ? "−" : "+"}
              </button>
            </div>

            {expandedRequestId === req.id && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Job Postings
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Type of Staff",
                          "Number of Staff",
                          "Salary Range",
                          "Job Details",
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
                      {req.jobs.map((job) => (
                        <tr
                          key={job.id}
                          className="hover:bg-yellow-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {job.type_of_staff}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {job.number_of_staff}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {job.salary_range}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-md truncate">
                            {job.job_details || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-gray-500 text-sm">
                  Created: {new Date(req.created_at).toLocaleString()} |
                  Updated: {new Date(req.updated_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffingRequest;
