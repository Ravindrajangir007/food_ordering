import React from "react";
import Heading from "./Heading";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Ravindra Jangir",
      role: "Founder & CEO",
      img: "/assets/img/photo-5.jpg",
    },
    {
      name: "Anita Sharma",
      role: "Head of Marketing",
      img: "/assets/img/photo-6.jpg",
    },
    {
      name: "Suresh Kumar",
      role: "Lead Chef",
      img: "/assets/img/photo-7.jpg",
    },
    {
      name: "Priya Singh",
      role: "Customer Support",
      img: "/assets/img/photo-8.jpg",
    },
  ];
  return (
    <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-0 pb-20">
      <Heading
        title="Meet Our Team"
        subtitle="Dedicated professionals committed to delivering the best experience."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-16">
        {teamMembers.map(({ name, role, img }, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow cursor-pointer"
          >
            <img
              src={img}
              alt={name}
              className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
            />
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-yellow-500 font-medium mt-1">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
