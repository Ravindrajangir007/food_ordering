import { BellIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function Header({ title }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0"
    >
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        <div className="h-8 w-px bg-gray-200" />

        <div className="flex items-center gap-3">
          <img
            src="https://avatars.githubusercontent.com/u/1234567?v=4"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Ravindrajangir007
            </p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
