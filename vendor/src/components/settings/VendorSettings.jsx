import React, { useState } from "react";

const VendorSettings = () => {
  const [brandName, setBrandName] = useState("");
  const [logo, setLogo] = useState(null);
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    postalCode: "",
  });
  const [kycDocument, setKycDocument] = useState(null);
  const [deliveryArea, setDeliveryArea] = useState("1km");

  const handleLogoUpload = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleKycUpload = (e) => {
    setKycDocument(e.target.files[0]);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSaveSettings = () => {
    // Handle save settings logic here
    console.log({
      brandName,
      logo,
      address,
      kycDocument,
      deliveryArea,
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Vendor Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Branding Information */}
        <div className="col-span-1">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Branding</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Brand Name
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Logo
            </label>
            <input
              type="file"
              onChange={handleLogoUpload}
              className="mt-1 block w-full text-sm text-gray-900"
            />
            {logo && <p className="mt-2 text-sm text-gray-500">{logo.name}</p>}
          </div>
        </div>

        {/* Address Details */}
        <div className="col-span-1">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Address</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address Line 1
            </label>
            <input
              type="text"
              name="line1"
              value={address.line1}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* KYC Document Upload */}
        <div className="col-span-1">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            KYC Document
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Document
            </label>
            <input
              type="file"
              onChange={handleKycUpload}
              className="mt-1 block w-full text-sm text-gray-900"
            />
            {kycDocument && (
              <p className="mt-2 text-sm text-gray-500">{kycDocument.name}</p>
            )}
          </div>
        </div>

        {/* Delivery Area Selection */}
        <div className="col-span-1">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Delivery Area
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Delivery Area
            </label>
            <select
              value={deliveryArea}
              onChange={(e) => setDeliveryArea(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="1km">1km</option>
              <option value="2km">2km</option>
              <option value="5km">5km</option>
              <option value="10km">10km</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSaveSettings}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default VendorSettings;
