import React, { useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Heading from "../../Component/Heading";
import {
  FaCheckCircle,
  FaFileInvoiceDollar,
  FaClock,
  FaHandsHelping,
  FaShieldAlt,
  FaComments,
} from "react-icons/fa";
import ComonServiceForm from "./ServiceForms/ComonServiceForm";

const GstRegistration = () => {
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
          title="GST Registration"
          subtitle="Register your business for GST compliance quickly and easily with our expert assistance."
          center
        />
      </div>

      {/* Main Content: Left info + Right form */}
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-20 gap-10 md:gap-0">
          {/* Left Info Panel */}
          <div className="bg-white p-5 py-10 md:py-20 rounded-lg md:rounded-0 shadow-md space-y-10">
            <img
              src="/assets/img/gst_Registration.webp"
              alt="GST Registration"
              className="mx-auto h-48 md:h-52"
            />
            <Heading
              title="Simplify Your GST Registration"
              subtitle="We help businesses comply with GST regulations with expert guidance and fast approvals."
              center
            />
          </div>

          {/* Right Form Panel */}
          <div
            className="w-full sticky top-20  overflow-y-auto rounded-lg shadow-md border border-yellow-300 bg-white/70 p-6"
            style={{ scrollbarWidth: "thin" }}
          >
            <h2 className="text-gray-900 text-2xl font-extrabold text-center mb-6 tracking-wide">
              GST Registration
            </h2>
            <ComonServiceForm formName="GST Registration" />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="bg-white/40 backdrop-blur-sm mt-20">
        <div className="max-w-6xl 2xl:max-w-7xl py-10 mx-auto px-4 md:px-0">
          <Heading
            title="Why Choose Our GST Registration Service?"
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
                title: "Trusted Experts",
                desc: "Our team ensures your GST registration is accurate and compliant.",
              },
              {
                icon: (
                  <FaFileInvoiceDollar
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "Transparent Pricing",
                desc: "No hidden fees, affordable and clear pricing for all businesses.",
              },
              {
                icon: (
                  <FaClock size={48} className="mx-auto mb-4 text-yellow-400" />
                ),
                title: "Fast Processing",
                desc: "We expedite your application to get your GSTIN quickly.",
              },
              {
                icon: (
                  <FaHandsHelping
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "End-to-End Support",
                desc: "From document collection to filing, we assist you at every step.",
              },
              {
                icon: (
                  <FaShieldAlt
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "Data Security",
                desc: "Your sensitive information is handled with utmost confidentiality.",
              },
              {
                icon: (
                  <FaComments
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "Dedicated Customer Care",
                desc: "Our support team is always ready to answer your queries promptly.",
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
          title="How Our GST Registration Works"
          className="mb-10"
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-800 px-4 md:px-0">
          {[
            {
              number: 1,
              title: "Submit Documents",
              description:
                "Provide your business and identity documents securely.",
            },
            {
              number: 2,
              title: "Application Filing",
              description:
                "We prepare and file your GST application accurately.",
            },
            {
              number: 3,
              title: "Receive GSTIN",
              description:
                "Get your GSTIN after government approval and start trading.",
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
            The GST registration process was smooth and hassle-free. The team
            was very professional and supportive.
            <footer className="mt-4 font-semibold text-yellow-500">
              - Amit Sharma, Business Owner
            </footer>
          </blockquote>
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            Excellent service and quick approvals. Highly recommend for GST
            registration.
            <footer className="mt-4 font-semibold text-yellow-500">
              - Neha Gupta, Retailer
            </footer>
          </blockquote>
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            Affordable pricing and great customer support throughout the
            process.
            <footer className="mt-4 font-semibold text-yellow-500">
              - Rajiv Kumar, Manufacturer
            </footer>
          </blockquote>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GstRegistration;
