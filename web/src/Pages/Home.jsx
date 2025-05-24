import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaRegThumbsUp,
  FaSmile,
  FaStar,
  FaUtensils,
} from "react-icons/fa";
import Footer from "../Component/Footer";
import Header from "../Component/Header";
import Heading from "../Component/Heading";
import ClientsSayBox from "../Component/ClientsSayBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const reviews = [
    {
      message:
        "Scheduling my meals with Kiyucart is so convenient! I can pause or reschedule anytime, which fits perfectly with my busy lifestyle.",
      name: "Neha Sharma, Regular Customer",
    },
    {
      message:
        "The ability to schedule orders ahead of time and get timely delivery has made my meal planning stress-free. Highly recommend Kiyucart!",
      name: "Arjun Patel, Food Enthusiast",
    },
    {
      message:
        "I love how easy it is to manage my food schedule with Kiyucart. The flexibility and reliability keep me coming back every week.",
      name: "Priyanka Joshi, Busy Professional",
    },
  ];
  return (
    <>
      {/* Hero div */}
      <div
        className="min-h-screen relative bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/img/bg-1.png')" }}
      >
        <Header border sticky />

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl 2xl:max-w-7xl mx-auto relative z-10 items-center mt-10 px-4 md:px-0 gap-10">
          <div className="space-y-6 text-center md:text-left">
            <Heading
              title="The Best Restaurants Delivered to Your Home"
              subtitle="Kiyucart connects you with trusted restaurants in your city,
              offering a seamless food ordering and delivery experience."
              left
            />
            {/* <Link
              to="/order"
              className="bg-yellow-500 px-7 py-4 rounded-2xl text-gray-50 font-semibold shadow-lg hover:bg-yellow-600 transition duration-500 ease-in-out inline-block"
            >
              Order From Cafe Coromandel
            </Link> */}
            <a
              href="http://app.kiyucart.com/"
              className="bg-yellow-500 px-7 py-4 rounded-2xl text-gray-50 font-semibold shadow-lg hover:bg-yellow-600 transition duration-500 ease-in-out inline-block"
            >
              Order Now
            </a>
          </div>
          <div className="flex justify-center relative">
            <img
              src="/assets/img/photo-1.png"
              className="w-full rounded-xl "
              alt="Delicious food served at your home"
            />
            <div className="absolute bg-white p-4 rounded-2xl top-20 right-0 flex justify-center items-center gap-3 shadow-lg">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex justify-center items-center text-white text-xl">
                <FaMapMarkerAlt />
              </div>
              <div className="leading-tight">
                <h1 className="text-gray-800 text-lg font-semibold">
                  12 Restaurants
                </h1>
                <span className="text-sm text-gray-800">In your city</span>
              </div>
            </div>
            <div className="absolute bg-white p-4 rounded-2xl bottom-10 md:bottom-24 left-0 flex justify-center items-center gap-4 shadow-lg max-w-xs">
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                <img
                  src="/assets/img/photo-2.jpg"
                  className="w-full h-full object-cover"
                  alt="Cafe Coromandel"
                />
              </div>
              <div className="leading-tight">
                <span className="text-sm text-gray-800 font-medium">
                  Restaurant of the Month
                </span>
                <h1 className="text-gray-800 text-lg font-bold">
                  Cafe Coromandel
                </h1>
                <div className="flex space-x-1 mt-1">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                  <FaStar className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works div */}
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto mt-32 pb-20 px-4 md:px-0">
          <Heading
            title="How It Works"
            subtitle="Order your favorite meals easily and enjoy timely delivery with Kiyucart."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 mt-16 gap-10">
            {[
              {
                img: "/assets/img/Illustration-1.png",
                number: "01",
                title: "Select Restaurant",
                desc: "Choose from a variety of trusted restaurants available in your city. Kiyucart connects you directly with vendors to ensure quality and variety.",
              },
              {
                img: "/assets/img/Illustration-2.png",
                number: "02",
                title: "Place & Schedule Order",
                desc: "Place your order and schedule delivery for now or later. You can pause, resume, or cancel scheduled orders before dispatch as per your convenience.",
              },
              {
                img: "/assets/img/illustration-3.png",
                number: "03",
                title: "Enjoy Your Meal",
                desc: "Your order will be prepared and delivered by the restaurant or their delivery partners. Please ensure availability at delivery time for a smooth experience.",
              },
            ].map(({ img, number, title, desc }, i) => (
              <div
                key={i}
                className="text-center px-4 rounded-xl p-6 transition-transform transform "
              >
                <img src={img} alt={title} className="mx-auto mb-4 w-full" />
                <div className="flex justify-center items-end my-4 gap-2">
                  <span className="text-3xl text-yellow-500 font-extrabold">
                    {number}
                  </span>
                  <h1 className="text-xl text-gray-800 font-bold">{title}</h1>
                </div>
                <p className="text-sm text-gray-600 max-w-xl mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second div with Food & Stats */}
      <div
        className="bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center py-20"
        style={{ backgroundImage: "url('/assets/img/bg-1.png')" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl 2xl:max-w-7xl mx-auto relative z-10 items-center mt-10  gap-10">
          <div className="flex justify-center relative">
            <img
              src="/assets/img/photo-3.png"
              className="w-full rounded-xl"
              alt="Delicious food served at your home"
            />
            <div className="absolute top-0 right-5 md:right-32 inline-flex flex-col justify-start space-y-4">
              {[
                { emoji: "🍳", label: "Breakfast" },
                { emoji: "🍔", label: "Lunch" },
                { emoji: "🍽️", label: "Dinner" },
              ].map(({ emoji, label }, i) => (
                <div
                  key={i}
                  className="bg-white p-3 py-2 rounded-2xl inline-flex justify-start items-center gap-3 shadow-md w-auto max-w-max transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <div className="flex justify-center items-center text-lg">
                    {emoji}
                  </div>
                  <div className="leading-tight">
                    <h1 className="text-gray-800 text-sm font-semibold">
                      {label}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 capitalize leading-tight">
              Food from your favorite restaurants to your table
            </h1>
            <p className="text-gray-600 max-w-md text-lg leading-relaxed">
              Enjoy fresh, delicious meals prepared by top restaurants and
              delivered right to your doorstep with care and punctuality.
            </p>
            <a
              href="http://app.kiyucart.com/"
              className="bg-yellow-500 px-7 py-4 rounded-2xl text-white font-semibold shadow-lg hover:bg-yellow-600 transition duration-500 ease-in-out inline-block"
            >
              Order Now
            </a>
          </div>
        </div>
        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center pt-20 divide-y md:divide-y-0 md:divide-x divide-gray-300">
          {[
            {
              number: "976",
              label: "Satisfied Customers",
              icon: (
                <FaSmile className="text-yellow-500 text-4xl md:text-5xl" />
              ),
            },
            {
              number: "12",
              label: "Best Restaurants",
              icon: (
                <FaUtensils className="text-yellow-500 text-4xl md:text-5xl" />
              ),
            },
            {
              number: "1K+",
              label: "Orders Delivered",
              icon: (
                <FaBoxOpen className="text-yellow-500 text-4xl md:text-5xl" />
              ),
            },
          ].map(({ number, label, icon }, i, arr) => (
            <div
              key={i}
              className={`bg-white p-10 flex justify-start items-center gap-4 border border-gray-300 shadow-md cursor-pointer
        ${i === 0 ? "rounded-t-2xl md:rounded-l-2xl md:rounded-t-none" : ""}
        ${
          i === arr.length - 1
            ? "rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none"
            : ""
        }
        `}
            >
              <div>{icon}</div>
              <div className="flex flex-col justify-start items-start">
                <span className="text-gray-900 font-extrabold text-2xl md:text-4xl">
                  {number}
                </span>
                <span className="text-gray-600 font-semibold text-sm md:text-lg">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#f8f8f8] py-10">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-3 sm:px-6 md:px-0 my-10">
          <Heading title="What Our Clients Say" />

          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              240: {
                slidesPerView: 1.2,
              },
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mt-10"
          >
            {reviews.map((item, index) => (
              <SwiperSlide key={index}>
                <ClientsSayBox message={item.message} name={item.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Kiyucart Blog div */}
      <div className="py-10">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto  my-10 px-3 sm:px-6 md:px-0">
          <Heading title="Kiyucart Blog" center />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              {
                img: "/assets/img/blog/blog-1.webp",
                title: "5 Tips to Choose the Best Restaurant for Your Meal",
                excerpt:
                  "Discover how to pick the perfect restaurant that suits your taste and budget with Kiyucart’s expert tips.",
                link: "/blog/choose-best-restaurant",
              },
              {
                img: "/assets/img/blog/blog-2.jpg",
                title: "How Scheduling Your Meals Can Save You Time",
                excerpt:
                  "Learn the benefits of meal scheduling and how Kiyucart makes it easy to plan your food delivery ahead.",
                link: "/blog/meal-scheduling-benefits",
              },
              {
                img: "/assets/img/blog/blog-3.jpg",
                title: "Top 10 Dishes to Try from Our Partner Restaurants",
                excerpt:
                  "Explore the most popular dishes loved by our customers and find your next favorite meal.",
                link: "/blog/top-10-dishes",
              },
            ].map(({ img, title, excerpt, link }, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <img
                  src={img}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">{excerpt}</p>
                  <Link
                    to={link}
                    className="text-yellow-500 font-semibold hover:underline mt-auto"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
