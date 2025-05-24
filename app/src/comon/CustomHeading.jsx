import React from "react";
import { Link } from "react-router-dom";

const CustomHeading = ({ title, discription, viewLink }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between items-center w-full ">
        <h2 className="text-[15px] md:text-lg text-gray-800 poppins-bold">
          {title}
        </h2>
        {viewLink && (
          <Link
            to={viewLink}
            className="text-[12px] text-yellow-500 poppins-light"
          >
            View All
          </Link>
        )}
      </div>
      {discription && (
        <p className="text-[12px] md:text-sm text-gray-500 poppins-light">
          {discription}
        </p>
      )}
    </div>
  );
};

export default CustomHeading;
