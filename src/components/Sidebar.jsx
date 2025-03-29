import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  TruckIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", icon: HomeIcon, path: "/" },
  { name: "Users", icon: UsersIcon, path: "/users" },
  { name: "Orders", icon: ShoppingBagIcon, path: "/orders" },
  { name: "Vendors", icon: TruckIcon, path: "/vendors" },
  { name: "Payments", icon: CurrencyRupeeIcon, path: "/payments" },
  { name: "Analytics", icon: ChartBarIcon, path: "/analytics" },
  { name: "Settings", icon: Cog6ToothIcon, path: "/settings" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: expanded ? 280 : 80 }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-30"
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <img src="/logo.svg" alt="FoodBoy" className="h-8 w-8" />
                <span className="text-xl font-semibold text-gray-900">
                  FoodBoy
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            {expanded ? "←" : "→"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <item.icon className="h-5 w-5" />
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://avatars.githubusercontent.com/u/1234567?v=4"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="font-medium text-gray-900">Ravindrajangir007</p>
                  <p className="text-sm text-gray-500">Admin</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
