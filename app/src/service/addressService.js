import axios from "axios";
import config, { GOOGLE_API } from "../config";

const API_URL = config.API_BASE_URL; // Base URL for your PHP API

// Axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 20000, // Increased timeout to 20 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to get the current location
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    const savedLocation = localStorage.getItem("userLocation");

    try {
      const locationObj = JSON.parse(savedLocation);
      if (locationObj.lat && locationObj.lng) {
        resolve({ lat: locationObj.lat, lng: locationObj.lng });
        return;
      }
    } catch (e) {
      // If parsing fails, ignore and get fresh location
    }
  });
};

export const getCurrentAddress = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const fullAddress = data.results[0].formatted_address;
      const place_id = data.results[0].place_id;

      // Extracting address components
      const cityComponent = data.results[0].address_components.find(
        (component) =>
          component.types.includes("locality") ||
          component.types.includes("administrative_area_level_1")
      );
      const stateComponent = data.results[0].address_components.find(
        (component) => component.types.includes("administrative_area_level_1")
      );
      const postalCodeComponent = data.results[0].address_components.find(
        (component) => component.types.includes("postal_code")
      );
      const countryComponent = data.results[0].address_components.find(
        (component) => component.types.includes("country")
      );

      const areaComponent = data.results[0].address_components.find(
        (component) =>
          component.types.includes("administrative_area_level_2") ||
          component.types.includes("locality")
      );

      // Extracting values or setting default values
      const city = cityComponent ? cityComponent.long_name : "City not found";
      const state = stateComponent
        ? stateComponent.long_name
        : "State not found";
      const postalCode = postalCodeComponent
        ? postalCodeComponent.long_name
        : "Postal code not found";
      const country = countryComponent
        ? countryComponent.long_name
        : "Country not found";
      const area = areaComponent ? areaComponent.long_name : "Area not found";

      return {
        city,
        state,
        postalCode,
        country,
        area,
        fullAddress,
        place_id,
        lat,
        lng,
      };
    } else {
      console.error("No results found");
      return null; // Return null if no results found
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return null; // Return null on error
  }
};

// Function to search for addresses using the PHP API
export const searchAddresses = async (query) => {
  try {
    const response = await api.post("/search", { query });

    if (response.status === 200) {
      return response.data || [];
    } else {
      console.error("Error fetching address predictions:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching address predictions:", error);
    return [];
  }
};
export const searchAddresseByPlaceID = async (place_id) => {
  try {
    const response = await api.post("/place_id", { place_id });

    if (response.status === 200) {
      return response.data || [];
    } else {
      console.error("Error fetching address predictions:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching address predictions:", error);
    return [];
  }
};

// Function to add a new address
export const addAddress = async (customer_token, addressData) => {
  console.log("customerId ss", customer_token);
  try {
    const response = await api.post("/addresses", {
      customer_token: customer_token,
      ...addressData, // Spread the address data
    });

    if (response.status === 201) {
      return response.data; // Return the response data on success
    } else {
      console.error("Error adding address:", response.status);
      return null; // Return null on error
    }
  } catch (error) {
    console.error("Error adding address:", error);
    return null; // Return null on error
  }
};

// Function to get all addresses for a customer
export const getAddresses = async (customer_token) => {
  try {
    const response = await api.get(`/addresses?token=${customer_token}`);
    if (response.status === 200) {
      return response.data; // Return the list of addresses
    } else {
      console.error("Error fetching addresses:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
};

// Function to update an existing address
export const updateAddress = async (id, addressData) => {
  try {
    const response = await api.put(`/addresses/${id}`, addressData);
    if (response.status === 200) {
      return response.data; // Return success message
    } else {
      console.error("Error updating address:", response.status);
      return null; // Return null on error
    }
  } catch (error) {
    console.error("Error updating address:", error);
    return null; // Return null on error
  }
};

// Function to delete an address
export const deleteAddress = async (id) => {
  try {
    const response = await api.delete(`/addresses/${id}`);
    if (response.status === 200) {
      return response.data; // Return success message
    } else {
      console.error("Error deleting address:", response.status);
      return null; // Return null on error
    }
  } catch (error) {
    console.error("Error deleting address:", error);
    return null; // Return null on error
  }
};

export const checkVendorDelivery = async (vendorId, lat, lng) => {
  try {
    console.log("location", vendorId, location);
    const formData = new FormData();
    formData.append("vendor_id", vendorId);
    formData.append("lat", lat);
    formData.append("lang", lng);
    const response = await api.post(`/checkVendorDelivery`, formData);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching trending dishes:", error);
    return [];
  }
};
