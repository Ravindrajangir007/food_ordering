import React, { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  addProductReview,
  fetchProductReviews,
} from "../../service/productService";
import config, { NonVegMark, VegMark } from "../../config";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { MdClose } from "react-icons/md";
import RatingDisplay from "../../comon/RatingDisplay";

const ProductDetailModal = ({ isOpen, onClose, product }) => {
  const { id } = useParams();
  const [isReviewOpen, setReviewOpen] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, user: "John Doe", rating: 5, comment: "Amazing taste!" },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      comment: "Loved it, but a bit spicy.",
    },
    { id: 3, user: "Alex Johnson", rating: 5, comment: "Perfect for lunch!" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductDetails = async () => {
      if (isOpen) {
        try {
          const reviewsData = await fetchProductReviews(id);
          setReviews(reviewsData);
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getProductDetails();
  }, [id, isOpen]);

  const handleAddReview = async (review) => {
    try {
      await addProductReview(product.id, review);
      setReviews((prevReviews) => [...prevReviews, review]);
      setReviewOpen(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const nutrition = [
    { name: "Calories", value: product?.calories, unit: "Kcl" },
    { name: "Protein", value: product?.protein, unit: "grams" },
    { name: "Fat", value: product.fat, unit: "grams" },
    { name: "Carbs", value: product.carbs, unit: "grams" },
    { name: "Sugar", value: product.sugar, unit: "grams" },
  ];

  const dietaryTags = product?.tags && JSON.parse(product?.tags);

  if (loading) return <LoadingSpinner />;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed bottom-0 left-0 right-0 overflow-y-auto z-50">
          <div className="max-w-lg mx-auto fixed bottom-0 md:bottom-10 top-10 left-0 right-0 overflow-y-auto rounded-t-3xl md:rounded-3xl overflow-hidden shadow-lg">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform overflow-hidden bg-white shadow-xl transition-all">
                <Dialog.Title as="div" className="relative">
                  <motion.header
                    className="shadow-md py-4 px-2 flex items-center absolute top-3 right-3 z-20"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.button
                      onClick={onClose}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-50 text-gray-600 transition cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                    >
                      <MdClose className="rotate-180" />
                    </motion.button>
                  </motion.header>
                </Dialog.Title>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Product Image */}
                  <motion.section
                    className="z-10 w-full relative"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Swiper
                      pagination={{ clickable: true }}
                      modules={[Pagination]}
                      spaceBetween={10}
                      slidesPerView={1}
                      loop={true}
                      className="w-full h-64 overflow-hidden"
                    >
                      <SwiperSlide>
                        <img
                          src={config.IMAGE_URL + product.main_image}
                          alt={product.name}
                          className="w-full h-64 object-cover"
                        />
                      </SwiperSlide>
                      {product.additional_images?.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={config.IMAGE_URL + image}
                            alt={`${product.name} additional ${index + 1}`}
                            className="w-full h-64 object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <p className="text-[13px] poppins-semibold absolute bg-white -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 px-2 py-1 rounded-t-[80px] z-20 text-center">
                      {product.vendor}
                    </p>
                    <div className="absolute top-4 left-2 z-20">
                      <div className="flex justify-start items-center gap-1">
                        {product.is_veg == 1 && <VegMark />}
                        {product.is_nonveg == 1 && <NonVegMark />}
                      </div>
                    </div>
                  </motion.section>

                  {/* Product Details */}
                  <motion.div
                    className="rounded-t-4xl bg-white w-full h-full overflow-y-auto pb-52"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  >
                    <section className="p-4 pb-20">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg poppins-bold">
                            {product.name}
                          </h2>
                          <p className="text-gray-800 text-lg poppins-medium">
                            {config.CURRENCY + product.price}
                          </p>
                        </div>
                        <RatingDisplay
                          averageRating={product.rating}
                          totalRatings={product.totalRatings}
                        />
                        <p className="text-xs poppins-light">
                          {product.description}
                        </p>

                        {/* Dietary Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {dietaryTags &&
                            dietaryTags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100  rounded-full text-xs poppins-regular"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Nutrition Section */}
                      <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-2">
                          Nutrition
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          {product.nutrition_description}
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {nutrition.map((item, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-0.5 items-center bg-white p-2 rounded-lg shadow-sm"
                            >
                              <span className="text-xs text-gray-500">
                                {item.name}
                              </span>
                              <span className="text-sm font-bold text-gray-800">
                                {item.value}
                              </span>
                              <span className="text-xs text-gray-400">
                                {item.unit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 my-4 text-justify">
                        {product.meta_discription}
                      </p>

                      {/* Reviews Section */}
                      <hr className="text-gray-200 my-2" />
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-bold text-gray-800">
                            Reviews
                          </h3>
                          <motion.button
                            className="text-sm text-yellow-500 hover:underline cursor-pointer"
                            onClick={() => setReviewOpen(true)}
                            whileTap={{ scale: 0.95 }}
                          >
                            Add Review +
                          </motion.button>
                        </div>
                        <div className="space-y-2">
                          {reviews.map((review) => (
                            <div
                              key={review.id}
                              className="bg-gray-100 p-3 rounded-lg shadow-sm"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-gray-800">
                                  {review.user}
                                </h4>
                                <span className="text-sm text-yellow-500">
                                  {"⭐".repeat(review.rating)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {review.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </motion.div>

                  {/* Review Modal */}
                  <AnimatePresence>
                    {isReviewOpen && (
                      <ReviewModal
                        isOpen={isReviewOpen}
                        onClose={() => setReviewOpen(false)}
                        onAddReview={handleAddReview} // Pass the function to add a review
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductDetailModal;
