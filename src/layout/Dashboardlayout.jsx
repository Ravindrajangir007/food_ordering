import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children, title }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-[280px]">
        <Header title={title} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
