import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import { motion } from "framer-motion";
import CustomHeading from "../comon/CustomHeading";
import SingleRestaurant from "../components/SingleRestaurant";
import MobileHeader from "../Header/MobileHeader";
import DesktopHeader from "../Header/DesktopHeader";
import { fetchNearbyVendors } from "../service/homeService";
import { getCurrentLocation } from "../service/addressService";
import { useWallet } from "../context/WalletContext";
import WalletLowBalanceAlert from "../comon/WalletLowBalanceAlert";
import { Link } from "react-router-dom";
import FooterInfo from "../comon/FooterInfo";
import { foodStoriesData } from "../service/foodStoriesData";

const Skeleton = ({ className }) => (
  <div className={`bg-gray-300 animate-pulse rounded ${className}`}></div>
);

const Home = () => {
  const { walletBalance } = useWallet();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const loadData = async (location) => {
    setLoading(true);
    try {
      let loc = location;

      if (!loc) {
        const savedLocation = localStorage.getItem("userLocation");
        if (savedLocation) {
          try {
            const parsedLoc = JSON.parse(savedLocation);
            if (parsedLoc.lat && parsedLoc.lng) {
              loc = { lat: parsedLoc.lat, lng: parsedLoc.lng };
            }
          } catch (e) {}
        }
      }

      if (!loc) {
        loc = await getCurrentLocation();
      }

      const vendor_list = await fetchNearbyVendors(loc.lat, loc.lng);
      setVendors(vendor_list);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <motion.div
        className="min-h-screen bg-sky-50 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="block md:hidden sticky top-0 right-0 left-0 z-30 bg-yellow-600">
          <MobileHeader
            onLocationChange={loadData}
            vender_length={vendors.length}
          />
        </div>
        <div className="hidden md:block sticky top-0 right-0 left-0 z-30 bg-yellow-600">
          <DesktopHeader onLocationChange={loadData} search cart wallet />
        </div>
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto pb-20 md:pb-0">
          <motion.section
            className="px-2 py-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {loading ? (
              <>
                <WalletLowBalanceAlert walletBalance={walletBalance} />
                <Skeleton className="h-8 w-48 mb-4 rounded" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-48 rounded" />
                  ))}
                </div>
              </>
            ) : vendors.length > 0 ? (
              <>
                <WalletLowBalanceAlert walletBalance={walletBalance} />
                <div className="flex items-center justify-between mb-4">
                  <CustomHeading
                    title="Nearby Restaurants 🍽️"
                    discription="Discover the best local flavors and hidden gems around you, carefully curated for your taste buds."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
                  {vendors.map((vendor, index) => (
                    <SingleRestaurant key={index} restaurant={vendor} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-10 bg-white rounded-xl">
                <img
                  src="/icons/expending.avif"
                  className="w-72 mx-auto"
                  alt=""
                />
                <h2 className="text-yellow-800 font-medium">
                  We are expanding to your area!
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Please provide your mobile number, and we will notify you as
                  soon as we are available in your area.
                </p>
                {isSubmitted ? (
                  <p className="text-yellow-600 text-xs mt-4">
                    Thank you! We will notify you when we are available in your
                    area.
                  </p>
                ) : (
                  <form
                    onSubmit={handleMobileSubmit}
                    className="mt-6 flex flex-col items-center"
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center">
                        <span className="text-gray-500 font-medium text-sm">
                          +91
                        </span>
                      </div>
                      <input
                        type="tel"
                        maxLength="10"
                        value={mobileNumber}
                        onChange={(e) =>
                          setMobileNumber(e.target.value.replace(/\D/g, ""))
                        }
                        className="w-full pl-16 pr-5 py-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm transition-all duration-200"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Notify Me
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.section>

          {/* Food Stories */}
          <motion.section
            className="px-2 py-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center justify-between mb-4">
              <CustomHeading
                title="Food Stories 📖"
                discription="Delve into the rich tales and traditions behind your favorite dishes, crafted with passion and history."
                viewLink="/food-stories"
              />
            </div>

            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
              {loading
                ? [...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="w-64 h-72 rounded-xl" />
                  ))
                : foodStoriesData.map((story, index) => (
                    <Link to={`/food-story/${story.slug}`} key={index}>
                      <motion.div
                        className="flex-shrink-0 w-64 bg-white rounded-xl border border-gray-300 overflow-hidden cursor-pointer relative"
                        variants={itemVariants}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        <div className="absolute bottom-2 right-2 left-2 bg-white rounded-xl  p-3">
                          <h3 className="poppins-medium">{story.title}</h3>
                          <p className="text-xs text-gray-600 mt-1">
                            {story.description}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
            </div>
          </motion.section>
        </div>
        <div className="block md:hidden">
          {vendors.length > 0 && <BottomNav />}
        </div>
        <div className="hidden md:block">
          <FooterInfo />
        </div>
      </motion.div>
    </>
  );
};

export default Home;
