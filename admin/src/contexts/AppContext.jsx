import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

// Static application data
const INITIAL_STATE = {
  currentDateTime: "2025-03-27 10:39:10",
  settings: {
    theme: "light",
    language: "en",
    notifications: true,
    currency: "INR",
    timezone: "UTC",
  },
  stats: {
    totalOrders: 1250,
    totalRevenue: 450000,
    activeSubscriptions: 520,
    lowStockItems: 12,
  },
  notifications: [
    {
      id: 1,
      type: "warning",
      message: "Low stock alert for 5 items",
      timestamp: "2025-03-27 10:30:00",
      read: false,
    },
    {
      id: 2,
      type: "success",
      message: "New subscription order received",
      timestamp: "2025-03-27 10:15:00",
      read: false,
    },
    {
      id: 3,
      type: "info",
      message: "Daily report generated",
      timestamp: "2025-03-27 10:00:00",
      read: true,
    },
  ],
};

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(INITIAL_STATE.settings);
  const [stats, setStats] = useState(INITIAL_STATE.stats);
  const [notifications, setNotifications] = useState(
    INITIAL_STATE.notifications
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    localStorage.setItem(
      "settings",
      JSON.stringify({ ...settings, ...newSettings })
    );
  };

  const updateStats = (newStats) => {
    setStats((prev) => ({ ...prev, ...newStats }));
  };

  const addNotification = (notification) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...notification,
      },
      ...prev,
    ]);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Format currency based on settings
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: settings.currency,
    }).format(amount);
  };

  // Format date based on settings
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      timeZone: settings.timezone,
    });
  };

  const value = {
    settings,
    updateSettings,
    stats,
    updateStats,
    notifications,
    addNotification,
    markNotificationAsRead,
    clearNotifications,
    formatCurrency,
    formatDate,
    loading,
    error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
