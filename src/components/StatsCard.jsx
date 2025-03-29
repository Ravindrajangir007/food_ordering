import { motion } from "framer-motion";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

export default function StatsCard({ title, value, change, icon: Icon, color }) {
  const isPositive = change > 0;

  return (
    <motion.div whileHover={{ y: -4 }} className="card">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span
          className={`flex items-center text-sm font-medium
          ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {isPositive ? "+" : ""}
          {change}%
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 ml-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 ml-1" />
          )}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-500">{title}</p>
    </motion.div>
  );
}
