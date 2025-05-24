import React, { useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Heading from "../../Component/Heading";
import {
  FaFileInvoiceDollar,
  FaClock,
  FaHandsHelping,
  FaShieldAlt,
  FaComments,
  FaCheckCircle,
} from "react-icons/fa";
import ComonServiceForm from "./ServiceForms/ComonServiceForm";

const AccountsGstReturnFiling = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/img/bg-1.png')" }}
    >
      <Header border sticky />

      {/* Hero Section */}
      <div className="bg-white/50 pt-5 md:py-10">
        <Heading
          title="Accounts & GST Return Filing"
          subtitle="Ensure timely and accurate GST return filing with our expert accounting services."
          center
        />
      </div>

      {/* Main Content: Left info + Right form */}
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-20 gap-10 md:gap-0">
          {/* Left Info Panel */}
          <div className="bg-white p-5 py-10 md:py-20 rounded-lg md:rounded-0 shadow-md space-y-10">
            <img
              src="/assets/img/gst-filling.jpeg"
              alt="GST Return Filing"
              className="mx-auto h-48 md:h-52"
            />
            <Heading
              title="Hassle-Free GST Return Filing"
              subtitle="We handle your GST returns accurately and on time, so you can focus on growing your business."
              center
            />
          </div>

          {/* Right Form Panel */}
          <div
            className="w-full sticky top-20  rounded-lg shadow-md border border-yellow-300 bg-white/70 p-6"
            style={{ scrollbarWidth: "thin" }}
          >
            <h2 className="text-gray-900 text-2xl font-extrabold text-center mb-6 tracking-wide">
              Accounts GST Return Filing
            </h2>
            <ComonServiceForm formName="Accounts Gst Return Filing" />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="bg-white/40 backdrop-blur-sm mt-20">
        <div className="max-w-6xl 2xl:max-w-7xl py-10 mx-auto px-4 md:px-0">
          <Heading
            title="Why Choose Our GST Return Filing Service?"
            className="mb-10"
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center px-4 md:px-0">
            {[
              {
                icon: (
                  <FaCheckCircle
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "Accurate Filing",
                desc: "We ensure your GST returns are filed correctly to avoid penalties.",
              },
              {
                icon: (
                  <FaClock size={48} className="mx-auto mb-4 text-yellow-400" />
                ),
                title: "Timely Submission",
                desc: "Never miss a deadline with our prompt filing services.",
              },
              {
                icon: (
                  <FaHandsHelping
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "Expert Support",
                desc: "Our team is available to assist you with any GST-related queries.",
              },
              {
                icon: (
                  <FaShieldAlt
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "Data Confidentiality",
                desc: "Your financial data is handled with strict confidentiality.",
              },
              {
                icon: (
                  <FaFileInvoiceDollar
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "Affordable Pricing",
                desc: "Competitive pricing tailored for small and medium businesses.",
              },
              {
                icon: (
                  <FaComments
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "Dedicated Customer Care",
                desc: "We provide personalized support throughout the filing process.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={i}
                className="p-6 border border-gray-300 rounded-xl shadow-sm hover:shadow-yellow-300 transition"
              >
                {icon}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl 2xl:max-w-7xl mt-20 mx-auto px-4 md:px-0">
        <Heading
          title="How Our GST Return Filing Works"
          className="mb-10"
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-800 px-4 md:px-0">
          {[
            {
              number: 1,
              title: "Submit Documents",
              description:
                "Provide your GST returns and financial documents securely.",
            },
            {
              number: 2,
              title: "Review & Filing",
              description:
                "Our experts review and file your GST returns accurately.",
            },
            {
              number: 3,
              title: "Confirmation & Support",
              description: "Receive filing confirmation and ongoing support.",
            },
          ].map(({ number, title, description }) => (
            <div
              key={number}
              className="flex flex-col items-start space-y-4 p-6 bg-gray-50 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-yellow-400 text-white font-bold text-lg shadow-md">
                {number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center w-full">
                {title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-center w-full">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl 2xl:max-w-7xl mt-20 mx-auto px-3 sm:px-6 md:px-0 mb-20">
        <Heading title="What Our Clients Say" className="mb-10" center />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            The GST return filing service saved us time and ensured compliance.
            <footer className="mt-4 font-semibold text-yellow-500">
              - Suresh Patel, Business Owner
            </footer>
          </blockquote>
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            Professional and timely filing with excellent customer support.
            <footer className="mt-4 font-semibold text-yellow-500">
              - Kavita Sharma, Trader
            </footer>
          </blockquote>
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            Affordable and reliable GST return filing service.
            <footer className="mt-4 font-semibold text-yellow-500">
              - Manoj Singh, Manufacturer
            </footer>
          </blockquote>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AccountsGstReturnFiling;
