import React, { useEffect, useState } from "react";
import { FaWifi, FaRedo } from "react-icons/fa";
import { toast } from "react-toastify";

const InternetLoss = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      setIsOnline(true);
      window.location.reload();
    } else {
      toast.error("Still offline. Please check your internet connection.", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (isOnline) {
    return null; // Or you can redirect or show nothing if online
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">
        <div className="mb-6">
          <FaWifi className="text-yellow-500 text-6xl animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          No Internet Connection
        </h1>
        <p className="text-gray-600 mb-8">
          It looks like you are offline. Please check your internet connection
          and try again.
        </p>
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition-colors duration-300 cursor-pointer"
        >
          <FaRedo />
          Retry
        </button>
      </div>
    </div>
  );
};

export default InternetLoss;
