import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomHeading from "../../comon/CustomHeading";
import { Link } from "react-router-dom";
import { foodStoriesData } from "../../service/foodStoriesData";
import MiniHeader from "../../Header/MiniHeader";
import BottomNav from "../../components/BottomNav";
import FooterInfo from "../../comon/FooterInfo";

const Skeleton = ({ className }) => (
  <div className={`bg-gray-300 animate-pulse rounded ${className}`}></div>
);

const AllFoodStories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [loading, setLoading] = useState(false);
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

  return (
    <>
      <motion.div
        className="min-h-screen bg-sky-50 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <MiniHeader heading={"Food Stories"} />
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto pb-20 md:pb-0">
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
              />
            </div>

            <div className=" grid grid-cols-2 md:grid-cols-4 gap-5 overflow-x-auto scrollbar-hide pb-4">
              {loading
                ? [...Array(4)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="grid grid-cols-2 md:grid-cols-5 gap-5 rounded-xl"
                    />
                  ))
                : foodStoriesData.map((story, index) => (
                    <Link to={`/food-story/${story.slug}`} key={index}>
                      <motion.div
                        className="flex-shrink-0  bg-white rounded-xl border border-gray-300 overflow-hidden cursor-pointer relative"
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
          <BottomNav />
        </div>
        <div className="hidden md:block">
          <FooterInfo />
        </div>
      </motion.div>
    </>
  );
};

export default AllFoodStories;
