import { motion } from "framer-motion";
import {
  UsersIcon,
  ShoppingBagIcon,
  TruckIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import StatsCard from "../components/StatsCard";

const stats = [
  {
    title: "Total Users",
    value: "2,345",
    change: 12.5,
    icon: UsersIcon,
    color: "bg-blue-500",
  },
  {
    title: "Active Orders",
    value: "156",
    change: -3.2,
    icon: ShoppingBagIcon,
    color: "bg-green-500",
  },
  {
    title: "Active Vendors",
    value: "48",
    change: 4.1,
    icon: TruckIcon,
    color: "bg-purple-500",
  },
  {
    title: "Revenue (MTD)",
    value: "₹1.2M",
    change: 23.4,
    icon: CurrencyRupeeIcon,
    color: "bg-brand-500",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Add more sections here */}
    </div>
  );
}
