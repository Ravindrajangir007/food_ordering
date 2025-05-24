import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  {
    name: "Dashboard",
    icon: Squares2X2Icon,
    href: "/",
    badge: null,
  },
  {
    name: "Schedules",
    icon: ShoppingBagIcon,
    href: "/schedules",
    badge: null,
  },
  {
    name: "Orders",
    icon: ShoppingBagIcon,
    href: "/orders",
    badge: null,
  },
  {
    name: "Vendors",
    icon: Cog6ToothIcon,
    href: null,
    children: [
      { name: "Vendors", href: "/vendors" },
      { name: "Vendor Onboarding Requests", href: "/vendorOnboardingRequests" },
    ],
  },
  {
    name: "Customers",
    icon: ClipboardDocumentListIcon,
    href: "/customers",
    badge: null,
  },
  {
    name: "Masters",
    icon: Cog6ToothIcon,
    href: null,
    children: [
      { name: "Categories", href: "/masters/categories" },
      { name: "Delivery Slots", href: "/masters/deliverySlots" },
    ],
  },
  {
    name: "Staffing Requests",
    icon: CurrencyDollarIcon,
    href: "/staffingRequest",
    badge: null,
  },
  {
    name: "Service Requests",
    icon: Cog6ToothIcon,
    href: null,
    children: [
      { name: "FSSAI Registration", href: "/service/fssai-registration" },
      { name: "GST Registration", href: "/service/gst-registration" },
      {
        name: "Accounts & GST Return Filing",
        href: "/service/accounts-gst-return-filling",
      },
    ],
  },
  {
    name: "Sign Out",
    icon: ArrowRightOnRectangleIcon,
    href: null,
    action: "logout",
    badge: null,
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 rounded-full hover:bg-gray-700/30 transition"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                  >
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <SidebarContent currentPath={location.pathname} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent currentPath={location.pathname} />
      </div>
    </>
  );
}

function SidebarContent({ currentPath }) {
  const { logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    // If clicked menu is already open, close it (set to null)
    // Otherwise, open the clicked menu
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const isChildActive = (children) =>
    children?.some((child) => currentPath === child.href);

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white pb-4">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b px-6 border-gray-200 shadow-sm">
        <h1 className="font-bold text-xl text-yellow-700 select-none">
          KiyuCart
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          {/* Main Navigation */}
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                if (item.children) {
                  const isOpen = openMenu === item.name;
                  const active = isChildActive(item.children);

                  return (
                    <li key={item.name}>
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className={`
                          group flex items-center justify-between rounded-lg p-3 text-sm font-semibold leading-6 w-full text-left
                          transition-colors duration-200
                          ${
                            active
                              ? "bg-yellow-100 text-yellow-700 shadow-inner"
                              : "text-gray-700 hover:text-yellow-700 hover:bg-yellow-50"
                          }
                        `}
                        aria-expanded={isOpen}
                        aria-controls={`${item.name}-submenu`}
                      >
                        <span className="flex items-center gap-x-3">
                          <item.icon
                            className={`h-6 w-6 shrink-0 transition-colors duration-200 ${
                              active
                                ? "text-yellow-700"
                                : "text-gray-400 group-hover:text-yellow-700"
                            }`}
                          />
                          {item.name}
                        </span>
                        <svg
                          className={`h-5 w-5 shrink-0 transform transition-transform duration-300 ${
                            isOpen ? "rotate-180" : "rotate-0"
                          } text-gray-400`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            id={`${item.name}-submenu`}
                            className="mt-1 space-y-1 pl-5"
                            role="menu"
                            aria-label={item.name}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            {item.children.map((child) => {
                              const childActive = currentPath === child.href;
                              return (
                                <li key={child.name}>
                                  <Link
                                    to={child.href}
                                    className={`
                                      group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                                      transition-colors duration-200
                                      ${
                                        childActive
                                          ? "bg-yellow-100 text-yellow-700 shadow-inner"
                                          : "text-gray-700 hover:text-yellow-700 hover:bg-yellow-50"
                                      }
                                    `}
                                    role="menuitem"
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                if (item.action === "logout") {
                  return (
                    <li key={item.name}>
                      <button
                        onClick={logout}
                        className={`
                          group flex items-center gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 w-full text-left
                          text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer
                        `}
                      >
                        <item.icon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-red-600 transition-colors duration-200" />
                        {item.name}
                      </button>
                    </li>
                  );
                }

                const active = currentPath === item.href;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        group flex items-center gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6
                        transition-colors duration-200
                        ${
                          active
                            ? "bg-yellow-100 text-yellow-700 shadow-inner"
                            : "text-gray-700 hover:text-yellow-700 hover:bg-yellow-50"
                        }
                      `}
                    >
                      <item.icon
                        className={`h-6 w-6 shrink-0 transition-colors duration-200 ${
                          active
                            ? "text-yellow-700"
                            : "text-gray-400 group-hover:text-yellow-700"
                        }`}
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
