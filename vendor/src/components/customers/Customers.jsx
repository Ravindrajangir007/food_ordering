import React, { useState, useEffect } from "react";
import CustomerModal from "./CustomerModal";

// Sample data for customers and orders
const sampleCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: "123 Main St, City, Country",
    registeredAt: "2023-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "0987654321",
    address: "456 Elm St, City, Country",
    registeredAt: "2023-02-01",
  },
];

const sampleOrders = [
  {
    id: 1,
    customerId: 1,
    orderDate: "2023-03-01",
    status: "Delivered",
    items: ["Pizza", "Coke"],
    totalAmount: 20.0,
  },
  {
    id: 2,
    customerId: 1,
    orderDate: "2023-03-15",
    status: "In Progress",
    items: ["Burger", "Fries"],
    totalAmount: 15.0,
  },
  {
    id: 3,
    customerId: 2,
    orderDate: "2023-04-01",
    status: "Delivered",
    items: ["Pasta", "Salad"],
    totalAmount: 18.0,
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching data from an API
    setCustomers(sampleCustomers);
    setOrders(sampleOrders);
  }, []);

  const handleCustomerClick = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const getCustomerOrders = (customerId) => {
    return orders.filter((order) => order.customerId === customerId);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Customers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registered At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleCustomerClick(customer.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.registeredAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        orders={selectedCustomer ? getCustomerOrders(selectedCustomer.id) : []}
      />
    </div>
  );
};

export default Customers;
