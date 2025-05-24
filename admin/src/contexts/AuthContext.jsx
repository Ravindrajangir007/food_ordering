import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../constant/global";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initial auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedVendor = localStorage.getItem("vendor");
        const storedToken = localStorage.getItem("vendorToken");

        if (storedVendor && storedToken) {
          // Set axios default header
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;

          // Get fresh vendor details from API
          const response = await axios.get(
            `${config.API_BASE_URL}/vendor/details`
          );

          if (response.data.success) {
            setVendor(response.data.data);
          } else {
            // If API call fails, remove stored data
            localStorage.removeItem("vendor");
            localStorage.removeItem("vendorToken");
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setError("Authentication check failed");
        localStorage.removeItem("vendor");
        localStorage.removeItem("vendorToken");
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

      const response = await axios.post(`${config.API_BASE_URL}/vendor/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { token, ...vendorData } = response.data.data;

        // Set token in axios default headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Store token and vendor data
        localStorage.setItem("vendorToken", token);
        localStorage.setItem("vendor", JSON.stringify(vendorData));

        setVendor(vendorData);

        // Navigate to dashboard
        navigate("/");
        return true;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      // Remove token from axios headers
      delete axios.defaults.headers.common["Authorization"];

      // Clear local storage
      localStorage.removeItem("vendor");
      localStorage.removeItem("vendorToken");

      setVendor(null);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${API_BASE_URL}/vendor/update-profile`,
        profileData
      );

      if (response.data.success) {
        const updatedVendor = response.data.data;
        localStorage.setItem("vendor", JSON.stringify(updatedVendor));
        setVendor(updatedVendor);
        return true;
      } else {
        throw new Error(response.data.message || "Profile update failed");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Profile update failed";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Axios interceptor for handling token expiration
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Remove interceptor when component unmounts
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const value = {
    vendor, // Vendor data
    loading, // Loading state
    error, // Error state
    login, // Login function
    logout, // Logout function
    updateProfile, // Update profile function
    isAuthenticated: !!vendor, // Helper to check if vendor is authenticated
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
