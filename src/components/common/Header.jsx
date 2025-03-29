import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, Navigate } from "react-router-dom";
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  CogIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const notifications = [
  {
    id: 1,
    title: "Low Stock Alert",
    description: "Inventory running low for several items",
    time: "5 minutes ago",
    type: "warning",
  },
  {
    id: 2,
    title: "New Order Received",
    description: "Class 10A placed a bulk order",
    time: "10 minutes ago",
    type: "info",
  },
  {
    id: 3,
    title: "Payment Received",
    description: "Subscription payment received from John Doe",
    time: "30 minutes ago",
    type: "success",
  },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile", icon: UserCircleIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
  { name: "Admin Panel", href: "/admin", icon: ShieldCheckIcon },
];

const handleLogout = () => {
  localStorage.clear();
  Navigate("/");
};

export default function Header({ setSidebarOpen }) {
  const currentDateTime = "2025-03-27 05:33:19";
  const currentUser = "Ravindrajangir007";

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Date/Time Display */}
        <div className="flex items-center gap-x-2">
          <ClockIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">{currentDateTime} UTC</span>
        </div>

        <div className="ml-auto flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 p-1.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
                {notifications.length}
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-80 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {notifications.map((notification) => (
                  <Menu.Item key={notification.id}>
                    <div className="px-4 py-2 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </Menu.Item>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <Menu.Item>
                    <Link
                      to="/notifications"
                      className="block px-4 py-2 text-sm text-indigo-600 hover:bg-gray-50"
                    >
                      View all notifications
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {currentUser}
                </span>
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        to={item.href}
                        className={`
                          flex px-4 py-2 text-sm text-gray-700 items-center
                          ${active ? "bg-gray-50" : ""}
                        `}
                      >
                        <item.icon className="h-5 w-5 mr-3 text-gray-400" />
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`
                        flex w-full px-4 py-2 text-sm text-gray-700 items-center
                        ${active ? "bg-gray-50" : ""}
                      `}
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-gray-400" />
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
