import React, { useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Heading from "../../Component/Heading";
import ComonServiceForm from "./ServiceForms/ComonServiceForm";

const FssaiRegistration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/img/bg-1.png')" }}
    >
      <Header border sticky />
      <div className="bg-white/50 pt-5 md:py-10">
        <Heading
          title="FSSAI Registration"
          subtitle="Get your food business legally registered with FSSAI quickly and hassle-free. We guide you through the entire process."
          center
        />
      </div>
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-20 gap-10 md:gap-0">
          <div className="bg-white p-5 py-10 md:py-20 rounded-lg md:rounded-0 shadow-md space-y-10">
            <img
              src="/assets/img/fssai_Certificate.webp"
              className="mx-auto h-48 md:h-52"
              alt="FSSAI Registration"
            />
            <Heading
              title="Simplify Your FSSAI Registration"
              subtitle="We help food businesses comply with FSSAI regulations with expert guidance and fast approvals."
              center
            />
          </div>
          <div
            className="w-full sticky top-20  overflow-y-auto rounded-lg shadow-md border border-yellow-300 bg-white/70 p-6"
            style={{ scrollbarWidth: "thin" }}
          >
            <h2 className="text-gray-900 text-2xl font-extrabold text-center mb-6 tracking-wide">
              FSSAI Registration
            </h2>
            <ComonServiceForm formName="FSSAI Registration" />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="bg-white/40 backdrop-blur-sm mt-20">
        <div className="max-w-6xl 2xl:max-w-7xl py-10 mx-auto px-4 md:px-0">
          <Heading
            title="Why Choose Our FSSAI Registration Service?"
            className="mb-12"
            center
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center px-4 md:px-0">
            {[
              {
                title: "Expert Guidance",
                desc: "Our experts ensure your application is error-free and complete.",
              },
              {
                title: "Fast Processing",
                desc: "We help expedite your FSSAI license approval process.",
              },
              {
                title: "Affordable Pricing",
                desc: "Transparent and competitive pricing with no hidden charges.",
              },
            ].map(({ title, desc }, i) => (
              <div
                key={i}
                className="p-6 border border-gray-300 rounded-xl shadow-sm hover:shadow-yellow-300 transition"
              >
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
          title="How Our FSSAI Registration Works"
          className="mb-12"
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-800 px-4 md:px-0">
          {[
            {
              number: 1,
              title: "Submit Documents",
              description:
                "Provide necessary business and identity documents for registration.",
            },
            {
              number: 2,
              title: "Application Filing",
              description:
                "We prepare and file your FSSAI application accurately.",
            },
            {
              number: 3,
              title: "Approval & License",
              description:
                "Receive your FSSAI license after government approval.",
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
        <Heading title="What Our Clients Say" className="mb-12" center />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            The FSSAI registration process was seamless and quick thanks to the
            expert team. Highly recommended!
            <footer className="mt-4 font-semibold text-yellow-500">
              - Sunita Sharma, Food Business Owner
            </footer>
          </blockquote>
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            Excellent support throughout the FSSAI license application. Very
            professional and transparent.
            <footer className="mt-4 font-semibold text-yellow-500">
              - Rajesh Kumar, Restaurant Manager
            </footer>
          </blockquote>
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            Affordable pricing and quick approvals made the process stress-free.
            <footer className="mt-4 font-semibold text-yellow-500">
              - Anjali Verma, Caterer
            </footer>
          </blockquote>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FssaiRegistration;
