import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

// Define user roles
export const userRoles = {
  ADMIN: "admin",
  MANAGER: "manager",
  STAFF: "staff",
  CASHIER: "cashier",
};

// Define role-based permissions
const rolePermissions = {
  [userRoles.ADMIN]: [
    "manage_users",
    "manage_roles",
    "manage_inventory",
    "manage_orders",
    "view_reports",
    "manage_catering",
    "manage_retail",
    "manage_settings",
    "manage_finances",
  ],
  [userRoles.MANAGER]: [
    "manage_inventory",
    "manage_orders",
    "view_reports",
    "manage_catering",
    "manage_retail",
  ],
  [userRoles.STAFF]: ["view_inventory", "view_orders", "manage_catering"],
  [userRoles.CASHIER]: ["manage_orders", "view_inventory"],
};

// Static user data
const MOCK_USER = {
  id: 1,
  username: "Ravindrajangir007@gmail.com",
  email: "ravindra@example.com",
  fullName: "Ravindra Jangir",
  role: userRoles.ADMIN,
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  permissions: rolePermissions[userRoles.ADMIN],
  lastLogin: "2025-03-27 10:46:26",
  settings: {
    theme: "light",
    language: "en",
    notifications: true,
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Simulate initial auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Add current time as last login
          parsedUser.lastLogin = new Date().toISOString();
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setError("Authentication check failed");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (email === "Ravindrajangir007@gmail.com" && password === "password") {
        const userData = {
          ...MOCK_USER,
          lastLogin: new Date().toISOString(),
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // Get redirect location or default to dashboard
        const location = navigate?.state?.from || "/";
        navigate(location);
        return true;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock registration
      const newUser = {
        ...MOCK_USER,
        username: userData.username,
        email: userData.email,
        fullName: userData.fullName,
        role: userRoles.STAFF, // Default role for new users
        lastLogin: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      navigate("/");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock password reset
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = {
        ...user,
        ...profileData,
        lastLogin: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permission) => {
    return user?.permissions.includes(permission);
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    forgotPassword,
    updateProfile,
    hasPermission,
    hasRole,
    userRoles, // Export userRoles through context
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export constants
export const PERMISSIONS = {
  MANAGE_USERS: "manage_users",
  MANAGE_ROLES: "manage_roles",
  MANAGE_INVENTORY: "manage_inventory",
  MANAGE_ORDERS: "manage_orders",
  VIEW_REPORTS: "view_reports",
  MANAGE_CATERING: "manage_catering",
  MANAGE_RETAIL: "manage_retail",
  MANAGE_SETTINGS: "manage_settings",
  MANAGE_FINANCES: "manage_finances",
  VIEW_INVENTORY: "view_inventory",
  VIEW_ORDERS: "view_orders",
};
