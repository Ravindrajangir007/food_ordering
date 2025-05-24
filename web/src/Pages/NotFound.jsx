import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-yellow-100 p-5 rounded-full mb-6">
              <FaExclamationTriangle className="text-yellow-500 text-5xl" />
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              404 - Page Not Found
            </h1>

            <p className="text-gray-600 mb-8 max-w-md">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 bg-yellow-500 text-white py-3 px-6 rounded-xl hover:bg-yellow-600 transition-colors duration-300"
              >
                <FaHome className="text-sm" />
                <span>Go Home</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                <FaArrowLeft className="text-sm" />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 border-t border-yellow-100">
          <p className="text-center text-gray-600 text-sm">
            Need help?{" "}
            <Link
              to="/contact-us"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
