import React from "react";
import { motion } from "framer-motion";
import config, { NonVegMark, VegMark } from "../config";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";

const SingleRestaurant = ({ restaurant }) => {
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
  const rest_url = `/${restaurant.city.toLowerCase()}/${restaurant.slug}`;

  return (
    <Link
      to={rest_url}
      onClick={localStorage.setItem("selectedVendor", restaurant)}
    >
      <motion.div
        className="flex-shrink-0 bg-white border border-gray-300 rounded-xl overflow-hidden cursor-pointer"
        variants={itemVariants}
        // whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <img
            src={config.IMAGE_URL + restaurant.profile_pic}
            alt={restaurant.businessName}
            className="w-full h-72 object-cover"
          />
          <div className="absolute top-2 left-2">
            <div className="flex justify-start items-center gap-1">
              {restaurant.isVeg === 1 ? <VegMark /> : <NonVegMark />}
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute top-2 right-2">
            <div className="flex justify-start items-center gap-1">
              <MdFavoriteBorder className="text-xl text-white" />
            </div>
          </div>

          <div className="absolute bottom-2 bg-white rounded-xl left-2 right-2 p-4 flex justify-between items-start">
            <div>
              <h3 className="poppins-medium">{restaurant.businessName}</h3>
              <span className="text-[12px] poppins-light flex flex-wrap text-gray-500">
                {restaurant.city}, {restaurant.state}
              </span>
            </div>
            <div>
              <div className="flex flex-col justify-end items-end gap-1">
                <div className="flex justify-start items-center gap-1 bg-yellow-800 px-2 text-[12px] rounded text-white">
                  {restaurant.avg_raiting} ⭐
                </div>
                <div className="flex justify-start items-center gap-1 text-[12px] rounded-full text-gray-500">
                  {restaurant.distance} km
                </div>
              </div>
            </div>
            {/* <p className="text-[12px] poppins-light flex flex-wrap text-gray-500">
            {restaurant.cuisine.map((cuisine, index) => (
              <span key={index} className="mr-1">
                {cuisine}
                {index < restaurant.cuisine.length - 1 && ","}
              </span>
            ))}
          </p> */}
            {/* 
          <div className="mt-5 flex justify-start items-center gap-2 text-nowrap overflow-auto">
            <div className="poppins-regular text-black bg-gray-100 rounded-lg px-2 pr-4 py-1 text-xs ">
              👍 {restaurant.ordersServed} Orders Served
            </div>
            <div className="poppins-regular text-black bg-gray-100 rounded-lg px-2 pr-4 py-1 text-xs ">
              📦 Min Order value ₹{restaurant.minOrderValue}
            </div>
          </div> */}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default SingleRestaurant;
