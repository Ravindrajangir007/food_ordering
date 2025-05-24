import React from "react";

const Heading = ({ title, subtitle, left, className }) => {
  return (
    <div
      className={`${
        left ? "text-center md:text-left" : "text-center"
      } ${className} max-w-6xl 2xl:max-w-7xl px-5 md:px-0 mx-auto`}
    >
      <h1 className="text-2xl 2xl:text-4xl font-extrabold text-gray-800 capitalize leading-tight mb-3">
        {title}
      </h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default Heading;
