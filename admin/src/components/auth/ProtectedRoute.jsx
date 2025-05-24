import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { vendor, loading } = useAuth(); // Changed from user to vendor
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if vendor is authenticated
  if (!vendor) {
    // Store the current location for redirect after login
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Please login to access vendor dashboard",
        }}
        replace
      />
    );
  }

  // Check if vendor is active
  if (vendor.status === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Account Inactive
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your vendor account is currently inactive. Please contact the
              administrator for activation.
            </p>
            <div className="mt-4">
              <button
                onClick={() => (window.location.href = "/contact-admin")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Contact Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if token is expired
  const token = localStorage.getItem("vendorToken");
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Session expired. Please login again.",
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
