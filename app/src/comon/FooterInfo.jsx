import React from "react";
import { Link } from "react-router-dom";

const legalLinks = [
  { label: "Disclaimer", to: "/refund" },
  { label: "Terms & Conditions", to: "/refund" },
  { label: "Privacy Policy", to: "/terms" },
  { label: "Refund Policy", to: "/contact" },
  { label: "Cancellation Policy", to: "/contact" },
  { label: "Cookies Policy", to: "/privacy" },
];

const FooterInfo = () => {
  return (
    <footer className="bg-yellow-100 text-gray-700 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col justify-between items-center space-y-4">
        {/* Legal Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          {legalLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="hover:text-yellow-600 transition-colors text-xs"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          &copy; {new Date().getFullYear()} All rights reserved. Managed By
          Kiyunet Technology
        </p>
      </div>
    </footer>
  );
};

export default FooterInfo;
