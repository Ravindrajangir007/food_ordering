import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MiniHeader from "../../Header/MiniHeader";
import { foodStoriesData } from "../../service/foodStoriesData";

const FoodStoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { slug } = useParams();
  const navigate = useNavigate();

  const story = foodStoriesData.find((item) => item.slug === slug);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-gray-600">No story found for this slug.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-sky-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MiniHeader heading={story.title} />

      {/* Image */}
      <div className="p-4 max-w-6xl 2xl:max-w-7xl mx-auto">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-lg font-medium">{story.title}</h1>
        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {story.description}
        </p>
        <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-line text-justify">
          {story.fullStory}
        </p>
      </div>
    </motion.div>
  );
};

export default FoodStoryPage;
