import React, { useState } from "react";
import {
  CiBoxes,
  CiCalendarDate,
  CiCircleList,
  CiHome,
  CiShoppingCart,
} from "react-icons/ci";

import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const BottomNav = () => {
  const { totalQuantity } = useCart();
  const location = useLocation();
  const [pressedButton, setPressedButton] = useState(null);

  const navItems = [
    { path: "/", icon: CiHome, label: "Home", col: "col-span-1" },
    // { path: "/products", icon: CiGrid41, label: "Items", col: "col-span-1" },
    {
      path: "/orders",
      icon: CiBoxes,
      label: "Orders",
      col: "col-span-1",
    },
    {
      path: "/cart",
      icon: CiShoppingCart,
      label: "Cart",
      col: "col-span-1",
      isCart: true,
    },
    {
      path: "/my-schedule",
      icon: CiCalendarDate,
      label: "Schedules",
      col: "col-span-1",
    }, // Using icon component

    { path: "/more", icon: CiCircleList, label: "More", col: "col-span-1" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100  z-20 text-gray-500 hover:text-gray-700"
    >
      <div className="grid grid-cols-5 items-center relative">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${item.col} relative`}
          >
            {item.isCart ? (
              <motion.div
                className="flex justify-center col-span-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-full py-3 flex flex-col items-center gap-1 transition-colors duration-200 cursor-pointer hover:bg-sky-50 rounded-full"
                  initial={false}
                  animate={{
                    scale: pressedButton === item.path ? 0.95 : 1,
                  }}
                  onTapStart={() => setPressedButton(item.path)}
                  onTapEnd={() => setPressedButton(null)}
                >
                  {/* Ripple Effect Background */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-20"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isActive(item.path)
                        ? {
                            scale: 1.5,
                            opacity: 0,
                            transition: { duration: 0.5 },
                          }
                        : { scale: 0, opacity: 0 }
                    }
                  />

                  {/* Cart Count Badge */}
                  <AnimatePresence>
                    {totalQuantity > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-2 left-6 bg-yellow-500 text-white w-5 h-5 text-[10px] rounded-full flex justify-center items-center shadow-md font-medium cursor-pointer"
                      >
                        {totalQuantity}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.button
                className={`w-full py-3 flex flex-col items-center gap-1 transition-colors duration-200 cursor-pointer hover:bg-sky-50 rounded-full ${
                  isActive(item.path)
                    ? "text-yellow-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={false}
                animate={{
                  scale: pressedButton === item.path ? 0.95 : 1,
                }}
                onTapStart={() => setPressedButton(item.path)}
                onTapEnd={() => setPressedButton(null)}
              >
                <motion.div
                  className="relative"
                  animate={
                    isActive(item.path)
                      ? { scale: 1.1, y: 0 }
                      : { scale: 1, y: 0 }
                  }
                >
                  <item.icon
                    className={`w-6 h-6 ${
                      item.label === "More" ? "rotate-180" : ""
                    }`}
                  />
                </motion.div>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
