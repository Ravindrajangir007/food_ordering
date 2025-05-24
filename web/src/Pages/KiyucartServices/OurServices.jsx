import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Heading from "../../Component/Heading";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const services = [
  {
    imgSrc: "/assets/img/services/manpower-solutions.jpg",
    alt: "Staffing Solutions",
    title: "Staffing Solutions",
    desc: "Find skilled and reliable staff tailored to your restaurant’s needs. We handle recruitment, training, and placement so you can focus on your business.",
    btnText: "Get Started",
    btnLink: "/service/staffing-solution",
  },
  {
    imgSrc: "/assets/img/services/fssai-registration-service.webp",
    alt: "FSSAI Registration",
    title: "FSSAI Registration",
    desc: "Get your FSSAI license hassle-free with our expert assistance. We guide you through the application process and ensure compliance with food safety standards.",
    btnText: "Get Started",
    btnLink: "/service/fssai-registration",
  },
  {
    imgSrc: "/assets/img/services/gst.webp",
    alt: "GST Registration",
    title: "GST Registration",
    desc: "Simplify your tax compliance with our GST registration service. We help you register quickly and keep your business legally compliant.",
    btnText: "Get Started",
    btnLink: "/service/gst-registration",
  },
  {
    imgSrc: "/assets/img/services/return.png",
    alt: "Accounts & GST Return Filing",
    title: "Accounts & GST Return Filing",
    desc: "Simplify your tax compliance with our GST registration service. We help you register quickly and keep your business legally compliant.",
    btnText: "Get Started",
    btnLink: "/service/accounts-gst-return-filing",
  },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: 20, height: 0 },
  visible: { opacity: 1, y: 0, height: "auto" },
  exit: { opacity: 0, y: 20, height: 0 },
};

const OurServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (title) => {
    setSearchTerm(title);
    setShowResults(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/img/bg-1.png')" }}
    >
      <Header border sticky />
      <div className="bg-white/50 pt-5 md:py-20">
        <Heading
          title="One-stop shop for all your restaurant needs"
          subtitle="Explore our comprehensive services designed to help your restaurant thrive."
        />
      </div>
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-0">
        {/* Search Box */}
        <div className="relative max-w-md mx-auto mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 rounded-lg border border-gray-300 outline-0 ring-2 ring-yellow-400 transition"
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 150)} // delay to allow click
            />
            <FaSearch className="absolute top-3.5 right-3 text-xl text-yellow-500" />
          </div>
          <AnimatePresence>
            {showResults && searchTerm.trim() !== "" && (
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                className="absolute z-20 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg max-h-60 overflow-auto"
                style={{ originY: 1 }}
              >
                {filteredServices.length > 0 ? (
                  filteredServices.map(({ title, btnLink }, i) => (
                    <Link
                      to={btnLink}
                      key={i}
                      // onClick={() => handleResultClick(title)}
                      className="cursor-pointer px-4 py-2 hover:bg-yellow-100 block"
                    >
                      {title}
                    </Link>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No services found</li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-16">
          {services.map(({ imgSrc, alt, title, desc, btnText, btnLink }, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md text-center flex flex-col overflow-hidden"
            >
              <div className="w-full h-48">
                <img
                  src={imgSrc}
                  alt={alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {desc}
                </p>
                <Link
                  to={btnLink}
                  className="mt-auto inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition cursor-pointer"
                >
                  {btnText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <section className="mt-24 bg-yellow-50 rounded-xl p-8 shadow-md border border-yellow-300 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-yellow-800 mb-4">
            Why Choose Kiyucart Services?
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto text-sm leading-relaxed">
            We understand the unique challenges faced by restaurants. Our expert
            services are designed to simplify your operations, ensure
            compliance, and help you build a strong, successful business.
            Partner with us to access dedicated support, expert guidance, and
            seamless service delivery.
          </p>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center mb-20">
          <Link
            to="/contact-us"
            className="inline-block bg-yellow-600 text-white px-8 py-3 rounded-full font-bold text-sm md:text-lg hover:bg-yellow-700 transition"
          >
            Contact Us for Custom Solutions
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default OurServices;
