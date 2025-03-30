import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import {
  CurrencyRupeeIcon,
  UsersIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const statsConfig = [
  {
    id: "totalRevenue",
    name: "Total Revenue",
    icon: CurrencyRupeeIcon,
    iconBackground: "bg-indigo-500",
  },
  {
    id: "activeSubscriptions",
    name: "Active Subscriptions",
    icon: UsersIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: "dailyOrders",
    name: "Daily Orders",
    icon: ShoppingCartIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: "retailSales",
    name: "Retail Sales",
    icon: ShoppingBagIcon,
    iconBackground: "bg-purple-500",
  },
];

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((item) => {
        const stat = stats[item.id];
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <div className="flex items-center mb-5">
              <div className={`p-3 rounded-md ${item.iconBackground}`}>
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {stat.value}
                </dd>
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {stat.changeType === "increase" ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`ml-1 font-medium ${
                        stat.changeType === "increase"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <span className="text-gray-500">{stat.period}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
