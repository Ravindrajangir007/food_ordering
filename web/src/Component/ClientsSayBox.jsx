import React from "react";

const ClientsSayBox = ({ message, name }) => {
  return (
    <div className="text-xs md:text-sm bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 ">
      {message}
      <footer className="mt-4 font-semibold text-yellow-500">{name}</footer>
    </div>
  );
};

export default ClientsSayBox;
