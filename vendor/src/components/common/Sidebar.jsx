import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  TruckIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  UserIcon, // Add the UserIcon for the Customer menu item
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Dashboard",
    icon: Squares2X2Icon,
    href: "/",
    badge: null,
  },
  {
    name: "Orders",
    icon: ShoppingBagIcon,
    href: "/orders",
    badge: null,
  },
  {
    name: "Products",
    icon: ClipboardDocumentListIcon,
    href: "/products",
    badge: null,
  },
  {
    name: "Payments",
    icon: CurrencyDollarIcon,
    href: "/payments",
    badge: null,
  },
  {
    name: "Delivery Captains",
    icon: TruckIcon,
    href: "/delivery-captains",
    badge: null,
  },
  {
    name: "Customers", // Add the Customer menu item
    icon: UserIcon,
    href: "/customers",
    badge: null,
  },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    href: "/settings",
    badge: null,
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const currentUser = "Ravindrajangir007";
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const isCurrentPath = (href) => location.pathname === href;
  const isParentActive = (children) =>
    children?.some((child) => location.pathname === child.href);

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
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <SidebarContent
                  currentPath={location.pathname}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                  isParentActive={isParentActive}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent
          currentPath={location.pathname}
          openMenus={openMenus}
          toggleMenu={toggleMenu}
          isParentActive={isParentActive}
        />
      </div>
    </>
  );
}

function SidebarContent({
  currentPath,
  openMenus,
  toggleMenu,
  isParentActive,
}) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white pb-4">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b px-6 border-gray-200 shadow-sm">
        {/* <img className="h-8 w-auto" src="/logo.png" alt="School Catering" /> */}
        <h1 className="font-bold text-xl">School Catering</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          {/* Main Navigation */}
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`
                      group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                      ${
                        currentPath === item.href
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                      }
                    `}
                  >
                    <item.icon
                      className={`h-6 w-6 shrink-0 ${
                        currentPath === item.href
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600"
                      }`}
                    />
                    {item.name}
                    {item.badge && (
                      <span
                        className={`ml-auto w-5 min-w-fit px-2 py-0.5 text-center text-xs rounded-full ${item.badge.color}`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* User Profile */}
          <li className="-mx-6 mt-auto">
            <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Ravindrajangir007</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
