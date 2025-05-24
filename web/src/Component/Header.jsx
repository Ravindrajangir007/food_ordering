import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Header = ({ border, sticky }) => {
  const [isStickyActive, setStickyActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      if (window.scrollY > 5) {
        setStickyActive(true);
      } else {
        setStickyActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);

  const menu = [
    { title: "About Us", link: "/about-us" },
    { title: "Partner With Us", link: "/partner-with-us" },
    { title: "Our Services", link: "/our-services" },
    { title: "Contact Us", link: "/contact-us" },
  ];

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  return (
    <>
      <div
        className={`relative z-50 px-4 md:px-0 ${
          border ? "border-b border-gray-300" : ""
        } ${
          sticky
            ? `sticky top-0 transition-all duration-500 ease-in-out ${
                isStickyActive
                  ? "bg-white/80 shadow-md backdrop-blur-sm"
                  : "bg-transparent shadow-none"
              }`
            : ""
        }`}
        style={{ willChange: "background-color, box-shadow" }}
      >
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto py-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-gray-900">
            Kiyucart
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-5">
            {menu.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="text-gray-700 hover:text-yellow-500 transition"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Order Now button - always visible */}
          <a
            href="http://app.kiyucart.com/"
            className="bg-yellow-500 px-5 py-3 rounded-lg text-white font-semibold shadow-md hover:bg-yellow-600 transition duration-300 uppercase hidden md:block"
          >
            Order Now
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none ml-4"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <HiMenu className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-yellow-500/30 z-40 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!sidebarOpen}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <Link
            to="/"
            className="text-2xl font-extrabold text-gray-900"
            onClick={() => setSidebarOpen(false)}
          >
            Kiyucart
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="text-gray-700 focus:outline-none"
          >
            <HiX className="w-8 h-8" />
          </button>
        </div>
        <nav className="flex flex-col p-6 space-y-4">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              onClick={() => setSidebarOpen(false)}
              className="text-gray-700 hover:text-yellow-500 font-semibold text-sm"
            >
              - {item.title}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Header;
