import React, { useEffect } from "react";
import Footer from "../Component/Footer";
import Header from "../Component/Header";
import TeamSection from "../Component/TeamSection";
import Heading from "../Component/Heading";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div
        className="min-h-screen relative bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/img/bg-1.png')" }}
      >
        {/* Header */}
        <Header sticky border />

        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl 2xl:max-w-7xl mx-auto relative z-10 items-center mt-10 md:mt-20 px-6 md:px-0 gap-10">
          <div className="space-y-5 text-center md:text-left">
            <Heading
              title="Nothing to worry about with Kiyucart"
              subtitle="Kiyucart is your trusted food ordering and scheduling platform,
              connecting you with the best restaurants in your city. We ensure a
              seamless experience from order placement to delivery, prioritizing
              quality, convenience, and customer satisfaction."
              left
            />
          </div>
          <div className="flex justify-center relative px-6 md:px-0">
            <div className="w-full max-w-md border-8 border-yellow-500 rounded-3xl shadow-lg ">
              <img
                src="/assets/img/photo-9.jpg"
                className="w-full rotate-12 rounded-3xl"
                alt="Delicious food served at your home"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl 2xl:max-w-7xl mx-auto relative z-10 items-center pt-20 px-6 md:px-0 gap-10">
          <div className="flex justify-center relative px-6 md:px-0">
            <img
              src="/assets/img/illustration-5.png"
              className="w-full max-w-md"
              alt="Our mission"
            />
          </div>
          <div className="space-y-5 text-center md:text-left">
            <Heading
              title="Our Mission is to Save You Time"
              subtitle={
                <div className="space-y-5 ">
                  <p className="text-gray-600 max-w-full md:max-w-md text-base sm:text-lg leading-relaxed mx-auto md:mx-0">
                    We strive to simplify your food ordering experience by
                    providing a reliable platform that connects you directly
                    with restaurants, allowing you to place and schedule orders
                    effortlessly.
                  </p>
                  <p className="text-gray-600 max-w-full md:max-w-md text-base sm:text-lg leading-relaxed mx-auto md:mx-0">
                    Our commitment is to ensure timely deliveries, maintain food
                    quality, and offer excellent customer support, so you can
                    enjoy your meals without any hassle.
                  </p>
                </div>
              }
              left
            />
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl 2xl:max-w-7xl mx-auto relative z-10 items-center py-20 px-6 md:px-0 gap-10">
          <div className="space-y-5 text-center md:text-left">
            <Heading
              title="Our Vision"
              subtitle={
                <div className="space-y-5 ">
                  <p className="text-gray-600 max-w-full md:max-w-md text-base sm:text-lg leading-relaxed mx-auto md:mx-0">
                    To be the most trusted and convenient food delivery platform
                    that connects people with their favorite restaurants,
                    delivering not just food but happiness and memorable
                    experiences right at their doorstep.
                  </p>
                  <p className="text-gray-600 max-w-full md:max-w-md text-base sm:text-lg leading-relaxed mx-auto md:mx-0">
                    We envision a future where ordering food is effortless,
                    transparent, and enjoyable, with a focus on quality, safety,
                    and customer delight.
                  </p>
                </div>
              }
              left
            />
          </div>
          <div className="flex justify-center relative px-6 md:px-0">
            <img
              src="/assets/img/elements-1.jpg"
              className="w-full max-w-md rounded-xl"
              alt="Our vision"
            />
          </div>
        </div>

        {/* Uncomment if you want to include TeamSection */}
        {/* <TeamSection /> */}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AboutUs;
