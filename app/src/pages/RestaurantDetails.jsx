import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBan, FaMapMarkerAlt } from "react-icons/fa";
import SingleProduct from "../components/SingleProduct";
import MiniHeader from "../Header/MiniHeader";
import config from "../config";
import { getCurrentLocation } from "../service/addressService";
import { fetchVendorDetail } from "../service/vendor";
import { HiOutlineShare } from "react-icons/hi";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import RatingDisplay from "../comon/RatingDisplay";

const Skeleton = ({ className }) => (
  <div className={`bg-gray-300 animate-pulse rounded ${className}`}></div>
);

const SkeletonText = ({ width = "full", height = "4" }) => (
  <Skeleton className={`w-${width} h-${height} mb-2`} />
);

const RestaurantDetails = () => {
  const { slug } = useParams();
  const { cart } = useCart();
  const [activeCategory, setActiveCategory] = useState(null);
  const [vendor, setVendor] = useState({});
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(
    JSON.parse(localStorage.getItem("userLocation")) || null
  );

  useEffect(() => {
    const loadData = async (vendor_slug) => {
      setLoading(true);
      try {
        const location =
          selectedAddress && selectedAddress.lat && selectedAddress.lng
            ? selectedAddress
            : await getCurrentLocation();
        const vendorDetail = await fetchVendorDetail(
          vendor_slug,
          location.lat,
          location.lng
        );

        setVendor(vendorDetail);
        setMenuData(vendorDetail.productsByCategory || {});
        const firstCategory = Object.keys(
          vendorDetail.productsByCategory || {}
        )[0];
        setActiveCategory(firstCategory || null);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData(slug);
  }, [slug]);

  const scrollToCategory = (category) => {
    setActiveCategory(category);
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this product!",
          text: `${vendor.businessName} - ${vendor.fullAddress}`,
          url: window.location.href,
        })
        .then(() => console.log("Share successful"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Share functionality is not supported in this browser.");
    }
  };

  return (
    <>
      <MiniHeader heading={loading ? "Loading..." : vendor?.businessName} />
      <div className="min-h-screen max-w-6xl 2xl:max-w-7xl mx-auto relative">
        {/* Restaurant Header Section */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-3 relative mt-2">
          <div className="relative">
            {loading ? (
              <Skeleton className="w-full h-64" />
            ) : (
              <>
                <img
                  src={config.IMAGE_URL + vendor.profile_pic}
                  alt={vendor.businessName}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </>
            )}
          </div>
          <div
            className={`absolute z-20 bottom-2 right-2 left-2 ${
              vendor.deliveryRadius === "no"
                ? "bg-red-100/70"
                : "bg-yellow-100/70"
            } rounded-lg backdrop-blur-xs overflow-hidden`}
          >
            {loading ? (
              <>
                <SkeletonText width="3/4" height="6" />
                <SkeletonText width="1/2" height="4" />
                <SkeletonText width="1/3" height="4" />
              </>
            ) : (
              <>
                {vendor.deliveryRadius === "no" && (
                  <div className="flex justify-start items-center gap-1 bg-red-200 text-red-800 p-2 text-xs">
                    <FaBan />
                    This location is outside the outlet's delivery area
                  </div>
                )}

                <div className="flex justify-between items-center p-4 md:p-6 ">
                  <div>
                    <h1 className="text-xl poppins-medium">
                      {vendor.businessName}
                    </h1>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-x-4 gap-y-2 mt-2">
                      <p className="poppins-medium flex items-start md:items-center text-xs md:text-sm">
                        <FaMapMarkerAlt className="mr-2 text-red-500" />
                        {vendor.fullAddress}
                      </p>
                      <div className="flex justify-start items-center gap-x-4 gap-y-1">
                        <div className="poppins-medium flex items-start md:items-center text-xs md:text-sm">
                          <RatingDisplay
                            averageRating={vendor.avg_rating}
                            totalRatings={vendor.total_rating}
                          />
                        </div>
                        <p className="poppins-medium flex items-start md:items-center text-xs md:text-sm">
                          {vendor.distance} km away
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleShare}
                      className="flex items-center text-gray-500 hover:text-gray-800 bg-sky-50 rounded-full p-2 cursor-pointer"
                    >
                      <HiOutlineShare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white pb-10">
          <div className="px-3 2xl:px-0">
            <div className="flex flex-col gap-4 relative">
              <div className="sticky top-18 bg-white z-20 py-2">
                {loading ? (
                  <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="w-24 h-8 rounded-full" />
                    ))}
                  </div>
                ) : (
                  <div className="flex overflow-x-auto hide-scrollbar gap-3">
                    {menuData &&
                      Object.keys(menuData).map((category) => (
                        <button
                          key={category}
                          onClick={() => scrollToCategory(category)}
                          className={`whitespace-nowrap px-4 py-2 text-xs md:text-sm rounded-full transition-colors duration-200 cursor-pointer ${
                            activeCategory === category
                              ? "bg-yellow-500 text-white"
                              : " border border-gray-200 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              <div className="w-full">
                {loading
                  ? [...Array(3)].map((_, i) => (
                      <div key={i} className="mb-8">
                        <Skeleton className="h-6 w-40 mb-4 rounded" />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {[...Array(4)].map((__, j) => (
                            <Skeleton key={j} className="h-48 rounded" />
                          ))}
                        </div>
                      </div>
                    ))
                  : Object.entries(menuData).map(([category, items]) => (
                      <div key={category} id={category} className="mb-8">
                        <h3 className="text-lg md:text-xl poppins-medium mb-4">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {items.map((item) => (
                            <SingleProduct
                              key={item.id}
                              item={item}
                              isDelivered={vendor.deliveryRadius}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
              </div>

              <div>
                {!loading && cart.length > 0 && (
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-4 z-20 rounded-t-2xl max-w-6xl 2xl:max-w-7xl mx-auto"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {cart.length} items in cart
                      </span>
                      <Link to="/cart">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-white text-yellow-600 rounded-lg text-sm font-medium flex justify-center items-center cursor-pointer"
                        >
                          <FiShoppingCart className="mr-2" />
                          View Cart
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantDetails;
