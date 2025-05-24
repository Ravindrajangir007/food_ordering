import {
  ShoppingCartIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const RecentOrders = () => {
  const orders = [
    {
      id: "#ORD12345",
      customerName: "John Doe",
      items: [
        { name: "Butter Chicken", quantity: 2 },
        { name: "Naan", quantity: 4 },
      ],
      total: "₹1,200",
      timestamp: "30 minutes ago",
      status: "preparing", // preparing, out-for-delivery, delivered, cancelled
      deliveryAddress: "123, Sector 1, City",
      captain: "Rajesh Kumar",
    },
    {
      id: "#ORD12344",
      customerName: "Sarah Smith",
      items: [
        { name: "Paneer Tikka", quantity: 1 },
        { name: "Roti", quantity: 3 },
      ],
      total: "₹850",
      timestamp: "45 minutes ago",
      status: "out-for-delivery",
      deliveryAddress: "456, Sector 2, City",
      captain: "Suresh Singh",
    },
    // Add more orders...
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "out-for-delivery":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Orders
        </h3>
        <p className="mt-1 text-sm text-gray-500">Latest 10 orders</p>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <ShoppingCartIcon className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.id}
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.replace(/-/g, " ").toUpperCase()}
                      </span>
                    </p>
                    <div className="mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <UserIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {order.customerName}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">
                    {order.items.map((item, index) => (
                      <span key={index}>
                        {item.quantity}x {item.name}
                        {index < order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPinIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {order.deliveryAddress}
                  </div>
                  {order.captain && (
                    <div className="mt-1 text-sm text-gray-500">
                      Captain: {order.captain}
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-6 flex-shrink-0">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {order.total}
                  </p>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {order.timestamp}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-lg">
        <div className="text-sm">
          <Link
            to="/orders"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all orders
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
