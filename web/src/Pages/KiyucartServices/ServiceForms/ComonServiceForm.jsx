import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { cities } from "../../../common/cities";
import { addServiceRequest } from "../../../Services/serviceRequest";
import { toast } from "react-toastify";

const customStyles = {
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    fontSize: "14px",
    borderRadius: "0.5rem", // rounded-md
    padding: "4px",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "200px",
    paddingTop: 0,
    paddingBottom: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#FEF3C7" : "white",
    color: "#111827",
    cursor: "pointer",
  }),
};

const ComonServiceForm = ({ formName }) => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    mobileNo: "",
    email: "",
    city: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = "Restaurant Name is required";
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile No is required";
    } else {
      // Basic mobile number validation (Indian format)
      const mobileRegex = /^[6-9]\d{9}$/;
      const cleanedMobile = formData.mobileNo.replace(/\D/g, ""); // remove non-digits
      if (!mobileRegex.test(cleanedMobile)) {
        newErrors.mobileNo = "Enter a valid 10-digit mobile number";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error on change
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const result = await addServiceRequest(formData, formName);
      toast.success(result.message);
      setFormData({
        restaurantName: "",
        mobileNo: "",
        email: "",
        city: "",
        message: "",
      });
    } catch (err) {
      alert("Failed to submit service request");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-10" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Restaurant Name */}
        <div>
          <label
            htmlFor="restaurantName"
            className="block mb-2 font-semibold text-gray-700"
          >
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurantName"
            value={formData.restaurantName}
            onChange={(e) => handleChange("restaurantName", e.target.value)}
            placeholder="Enter your restaurant name"
            className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-sm transition-shadow duration-300 shadow-sm hover:shadow-yellow-400 bg-white ${
              errors.restaurantName ? "border-red-500" : "border-[#ccc]"
            }`}
          />
          {errors.restaurantName && (
            <p className="text-red-500 text-xs mt-1">{errors.restaurantName}</p>
          )}
        </div>

        {/* Mobile No */}
        <div>
          <label
            htmlFor="mobileNo"
            className="block mb-2 font-semibold text-gray-700"
          >
            Mobile No
          </label>
          <input
            type="tel"
            id="mobileNo"
            maxLength={10}
            value={formData.mobileNo}
            onChange={(e) => {
              // Remove all non-digit characters
              const digitsOnly = e.target.value.replace(/\D/g, "");
              handleChange("mobileNo", digitsOnly);
            }}
            placeholder="+91 98765 43210"
            className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-sm transition-shadow duration-300 shadow-sm hover:shadow-yellow-400 bg-white ${
              errors.mobileNo ? "border-red-500" : "border-[#ccc]"
            }`}
          />
          {errors.mobileNo && (
            <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@example.com"
            className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-sm transition-shadow duration-300 shadow-sm hover:shadow-yellow-400 bg-white ${
              errors.email ? "border-red-500" : "border-[#ccc]"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block mb-2 font-semibold text-gray-700"
          >
            City
          </label>
          <Select
            options={cities}
            value={
              formData.city
                ? cities.find((option) => option.value === formData.city)
                : null
            }
            onChange={(selected) =>
              handleChange("city", selected ? selected.value : "")
            }
            styles={{
              ...customStyles,
              control: (provided, state) => ({
                ...customStyles.control(provided, state),
                borderColor: errors.city ? "red" : provided.borderColor,
              }),
            }}
            placeholder="Select City"
            isSearchable
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
          )}
        </div>

        {/* Message (full width) */}
        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="block mb-2 font-semibold text-gray-700"
          >
            Message
          </label>
          <textarea
            rows={4}
            id="message"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Write your message here"
            className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-sm transition-shadow duration-300 shadow-sm hover:shadow-yellow-400 bg-white ${
              errors.message ? "border-red-500" : "border-[#ccc]"
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>
      </div>

      <div className="text-left mt-6">
        <p className="text-sm font-semibold text-gray-800 text-center mb-5">
          By submitting you agree to the
          <Link to="/terms" className="text-yellow-500 mx-2 underline">
            Terms and Conditions
          </Link>
          and
          <Link to="/privacy" className="text-yellow-500 mx-2 underline">
            Privacy Policy
          </Link>
        </p>
        <button
          type="submit"
          className="bg-yellow-500 rounded-xl px-6 py-3 text-sm text-white cursor-pointer w-full md:w-auto block mx-auto md:mx-0"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
};

export default ComonServiceForm;
