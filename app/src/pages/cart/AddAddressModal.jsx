import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiX,
  FiMapPin,
  FiHome,
  FiBriefcase,
  FiMap,
  FiSearch,
  FiCheck,
} from "react-icons/fi";
import { MdApartment } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  addAddress,
  checkVendorDelivery,
  getCurrentAddress,
  getCurrentLocation,
  searchAddresseByPlaceID,
} from "../../service/addressService";
import SearchAddressModal from "./SearchAddressModal";
import toast from "react-hot-toast";
import ModelHeader from "../../comon/ModelHeader";

const AddAddressModal = ({ onClose, onSave, customer_token }) => {
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: "",
    lng: "",
  });
  const [addressType, setAddressType] = useState("Home");
  const [mapCenter, setMapCenter] = useState({});
  const [currentAddress, setCurrentAddress] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.length > 0 ? cart[0].vendor_id : null;
  });
  const [formData, setFormData] = useState({
    addressType: "Home",
    flatHouseOfficeNo: "",
    floorNo: "",
    buildingAreaName: "",
    landmark: "",
    place_id: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    fullAddress: "",
  });

  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [venderCanDeliver, setVenderCanDeliver] = useState(false);

  const addressTypes = [
    { id: "home", label: "Home", icon: FiHome },
    { id: "office", label: "Office", icon: FiBriefcase },
    { id: "pg", label: "PG", icon: MdApartment },
    { id: "gym", label: "Gym", icon: CgGym },
    { id: "other", label: "Other", icon: FiMapPin },
  ];

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getCurrentLocation();
        setMapCenter(location);
        await fetchAddress(location.lat, location.lng);
      } catch (error) {
        console.error("Failed to get current location:", error);
      }
    };

    fetchLocation();
  }, []);

  const fetchAddress = async (lat, lng) => {
    const addressData = await getCurrentAddress(lat, lng);
    if (addressData) {
      setCurrentAddress(addressData);

      setFormData({
        ...formData,
        place_id: addressData.place_id,
        city: addressData.city,
        state: addressData.state,
        postal_code: addressData.postalCode,
        country: addressData.country,
        fullAddress: addressData.fullAddress,
      });
    } else {
      console.error("Failed to fetch address data");
    }
  };

  const handleSelectLocation = async (placeId) => {
    try {
      setFormData({
        ...formData,
        place_id: placeId,
      });
      const response = await searchAddresseByPlaceID(placeId);
      if (response) {
        setMapCenter({ lat: response.latitude, lng: response.longitude });
        fetchAddress(response.latitude, response.longitude);
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const handleSubmit = async () => {
    const newAddress = {
      city: formData.city,
      state: formData.state,
      postal_code: formData.postal_code,
      country: formData.country,
      address_type: addressType,
      flat_no: formData.flatHouseOfficeNo,
      floorNo: formData.floorNo,
      building_name: formData.buildingAreaName,
      landmark: formData.landmark,
      placeId: formData.place_id,
      latitude: mapCenter.lat,
      longitude: mapCenter.lng,
      fullAddress: formData.fullAddress,
    };

    try {
      const result = await addAddress(customer_token, newAddress);

      if (result) {
        toast.success("Address added successfully!"); // Success toast
        onSave(newAddress);
        onClose();
      } else {
        toast.error("Failed to add address."); // Error toast
        console.error("Failed to add address");
      }
    } catch (error) {
      toast.error("Error: " + error.message); // Error toast
      console.error("Error:", error);
    }
  };

  const handleOpenSearchPopup = () => setShowSearchPopup(true);
  const handleCloseSearchPopup = () => setShowSearchPopup(false);

  const handleLocationSelect = async (location) => {
    // Call your existing handler with place_id or full location object as needed
    handleSelectLocation(location.place_id);

    // Get vendor_id from cart if exists
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const vendorId = cart.length > 0 ? cart[0].vendor_id : null;

    if (vendorId) {
      try {
        // Call your API to check delivery availability
        const canDeliver = await checkVendorDelivery(
          vendorId,
          location.lat,
          location.lng
        );
        setVenderCanDeliver(canDeliver["canDeliver"]);
      } catch (error) {
        console.error("Error checking vendor delivery:", error);
      }
    }

    // Close the search popup/modal
    handleCloseSearchPopup();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-sky-50 w-full max-w-md rounded-t-3xl overflow-hidden"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <ModelHeader
          header={step === 1 ? "Add New Address" : "Address Details"}
          onClose={onClose}
        />

        {step === 1 ? (
          // Step 1: Location Search
          <>
            <div className="relative">
              <button
                onClick={handleOpenSearchPopup}
                className="px-5 pr-4 py-3 rounded-xl flex justify-start items-center gap-3 cursor-pointer text-gray-600 absolute top-2 right-3 left-3 z-10 bg-white/80 text-sm shadow"
              >
                <FiSearch className="w-5 h-5" />
                Search for Address
              </button>
              {/* Map View */}
              <div
                className="bg-gray-100 relative"
                style={{ height: "calc(100vh - 50vh)" }}
              >
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={mapCenter}
                  zoom={20}
                  options={{
                    fullscreenControl: false,
                    keyboardShortcuts: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                  }}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              </div>
            </div>
            <div className="p-2 bg-white m-2 rounded-xl">
              <p className="text-gray-900 font-semibold text-[10px] mb-2 capitalize">
                Delivering Your Order To
              </p>
              <div className="flex justify-start items-start gap-2">
                <FaMapMarkerAlt className="text-yellow-500 text-2xl" />
                <div>
                  <h3 className="font-medium text-sm">
                    {currentAddress.area || "Fetching area..."}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {currentAddress.fullAddress || "Fetching address..."}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Step 2: Address Details
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {addressTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.id}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl border-1 flex items-center gap-2 cursor-pointer hover:bg-yellow-50 hover:border-yellow-500 duration-600 ${
                        addressType === type.label
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => setAddressType(type.label)}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          addressType === type.label
                            ? "text-yellow-500"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="text-xs">{type.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Address Details Form */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Flat/House/Office No."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={formData.flatHouseOfficeNo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    flatHouseOfficeNo: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Floor No."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={formData.floorNo}
                onChange={(e) =>
                  setFormData({ ...formData, floorNo: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Building/Area/Apartment Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={formData.buildingAreaName}
                onChange={(e) =>
                  setFormData({ ...formData, buildingAreaName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Landmark (Optional)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={formData.landmark}
                onChange={(e) =>
                  setFormData({ ...formData, landmark: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* Bottom Action */}
        <div className="p-4 border-t border-gray-100">
          {venderCanDeliver ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (step === 1 && selectedLocation) {
                  setStep(2);
                } else if (step === 2) {
                  handleSubmit();
                }
              }}
              disabled={
                step === 1
                  ? !selectedLocation
                  : !formData.addressType || !formData.flatHouseOfficeNo
              }
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer ${
                (
                  step === 1
                    ? !selectedLocation
                    : !formData.addressType || !formData.flatHouseOfficeNo
                )
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {step === 1 ? (
                <>
                  <FiMap className="w-5 h-5" />
                  Confirm Location
                </>
              ) : (
                <>
                  <FiCheck className="w-5 h-5" />
                  Save Address
                </>
              )}
            </motion.button>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center mb-4 text-red-500">
                <h1 className="text-sm font-medium">
                  Sorry, this vendor does not deliver to your location.
                </h1>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Unfortunately, the vendor you selected does not provide
                  delivery service to this area. Please try a different location
                  or enter your address manually.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenSearchPopup}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer bg-yellow-500 text-white`}
              >
                <FiMap className="w-5 h-5" />
                Enter Manual Address
              </motion.button>
            </>
          )}
        </div>
      </motion.div>

      {showSearchPopup && (
        <SearchAddressModal
          onClose={handleCloseSearchPopup}
          onSelect={handleLocationSelect}
        />
      )}
    </motion.div>
  );
};

export default AddAddressModal;
