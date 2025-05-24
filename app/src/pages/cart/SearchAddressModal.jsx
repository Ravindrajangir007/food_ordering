import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiMapPin, FiSearch } from "react-icons/fi";
import {
  getCurrentAddress,
  getCurrentLocation,
  searchAddresses,
} from "../../service/addressService"; // Adjust the path as necessary
import { MdMyLocation } from "react-icons/md";
import ModelHeader from "../../comon/ModelHeader";

const SearchAddressModal = ({ onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getCurrentLocation();
        const addressData = await getCurrentAddress(location.lat, location.lng); // Fetch address based on coordinates
        if (addressData) {
          setCurrentAddress(addressData); // Update state with the fetched address
        } else {
          console.error("Failed to fetch address data");
        }
      } catch (error) {
        console.error("Failed to get current location:", error);
      }
    };

    fetchLocation();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const predictions = await searchAddresses(searchQuery);
      if (predictions && predictions.length > 0) {
        setSearchResults(predictions);
      } else {
        console.error("No predictions found");
      }
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  };

  const handleSelectLocation = (address) => {
    onSelect(address); // Pass the selected placeId back to the parent
    onClose(); // Close the popup
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-sky-50 w-full max-w-md rounded-t-xl overflow-hidden"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModelHeader header="Select an Address" onClose={onClose} />

        <div
          className="relative overflow-auto"
          style={{ height: "calc(100vh - 25vh)" }}
        >
          <div className="px-4 pt-4">
            <div className="mb-4 sticky top-0 bg-white">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
              <input
                type="text"
                placeholder="Search for area, street name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm ring-0 outline-0"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch();
                }}
              />
            </div>
          </div>
          <div className="px-4">
            <div
              className="bg-white rounded-lg p-2 flex justify-start items-start gap-2 cursor-pointer"
              // onClick={() => handleSelectLocation(currentAddress.place_id)}
              onClick={() => handleSelectLocation(currentAddress)}
            >
              <div className="flex-shrink-0">
                <MdMyLocation className="text-yellow-600 text-lg mt-1.5" />
              </div>
              <div>
                <h1 className="text-yellow-600 text-sm">
                  Use Your Current Location
                </h1>
                <div>
                  <p className="text-gray-600 text-xs">
                    {currentAddress.fullAddress || "Fetching address..."}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 bg-white p-1 rounded-xl">
              <ul className="divide-y-2 ">
                {searchResults && searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <motion.li
                      key={result.place_id}
                      whileTap={{ scale: 0.98 }}
                      className="p-3 cursor-pointer border-gray-200 hover:bg-gray-50 duration-300"
                      onClick={() => handleSelectLocation(result)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-gray-100">
                          <FiMapPin className="text-gray-500" />
                        </div>
                        <div>
                          <h3 className="text-xs">{result.description}</h3>
                        </div>
                      </div>
                    </motion.li>
                  ))
                ) : (
                  <div className="p-3 text-gray-500 text-center text-sm">
                    No results found
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchAddressModal;
