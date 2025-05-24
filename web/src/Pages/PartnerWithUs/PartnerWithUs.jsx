import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Heading from "../../Component/Heading";
import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import {
  FaUsers,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaHeadset,
  FaBullhorn,
} from "react-icons/fa";
import PartnerWithUsForm from "./PartnerWithUsForm";

const PartnerWithUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Who can partner with Kiyucart?",
      a: "Any registered food vendor or restaurant looking to expand their reach can partner with us.",
    },
    {
      q: "What documents are required to sign up?",
      a: "PAN card, GST number (if applicable), FSSAI license, menu & profile food images, and bank account details.",
    },
    {
      q: "How long does the sign-up process take?",
      a: "It only takes about 10 minutes if you have all the required documents ready.",
    },
    {
      q: "What if I don't have an FSSAI license?",
      a: (
        <>
          You can apply for an FSSAI license through the{" "}
          <a
            href="https://foscos.fssai.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 underline"
          >
            official portal
          </a>
          .
        </>
      ),
    },
    {
      q: "What is a profile food image?",
      a: (
        <>
          A profile food image is a high-quality photo representing your
          restaurant's signature dishes. Refer{" "}
          <a
            href="https://example.com/profile-food-image-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 underline"
          >
            here
          </a>
          .
        </>
      ),
    },
    {
      q: "Is there any exclusivity agreement?",
      a: "Yes, vendors commit to a 10-year exclusivity period to maintain quality and consistency on the platform.",
    },
    {
      q: "How do I get paid?",
      a: "Payments are processed securely through our platform directly to your registered bank account.",
    },
    {
      q: "Can I update my menu later?",
      a: "Yes, you can update your menu and profile images anytime through your vendor dashboard.",
    },
    {
      q: "What support does Kiyucart provide?",
      a: "We provide marketing, technical support, and customer service to help you grow your business.",
    },
    {
      q: "How do I contact support if I have questions?",
      a: "You can reach out to our vendor support team via email or phone, details will be provided after sign-up.",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/img/bg-1.png')" }}
    >
      <Header border sticky />
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl 2xl:max-w-7xl mx-auto relative z-10 items-center mt-10 md:mt-20 px-4 md:px-0 gap-10 ">
        <div className="rounded-2xl order-2 md:order-1">
          <Heading
            left
            title="Reach customers far away from you"
            subtitle="Please keep these documents and details ready for a smooth sign-up:"
          />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-800 mt-5">
            {[
              { text: "PAN card" },
              {
                text: "GST number, if applicable",
                link: { href: "#", label: "Apply here" },
              },
              {
                text: "FSSAI license",
                link: { href: "#", label: "Apply here" },
              },
              { text: "Menu & profile food image" },
              { text: "Bank account details" },
            ].map(({ text, link }, i) => (
              <li
                key={i}
                className="flex items-center gap-2 p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                <div className="flex-shrink-0 bg-yellow-200 text-yellow-600 rounded-full p-2">
                  <FaCircleCheck size={20} />
                </div>
                <span className="text-sm font-medium flex flex-col justify-start">
                  <span>{text}</span>
                  {link && (
                    <Link
                      to={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-600 underline font-semibold hover:text-yellow-700 text-xs"
                    >
                      {link.label}
                    </Link>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 bg-white rounded-xl p-3 shadow-md border border-yellow-300">
            <h3 className="text-sm font-semibold text-yellow-700 mb-2">
              Additional Tips for a Successful Partnership:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs leading-relaxed">
              <li>Ensure your menu images are high quality and appealing.</li>
              <li>
                Keep your contact details up to date for smooth communication.
              </li>
              <li>Respond promptly to customer inquiries and feedback.</li>
              <li>Maintain food quality and timely delivery to build trust.</li>
              <li>
                Leverage Kiyucart's marketing support to boost your sales.
              </li>
            </ul>
          </div>

          <div className="mt-5 bg-yellow-50 rounded-xl p-3 border border-yellow-400 shadow-md">
            <h3 className="text-sm font-bold text-yellow-800 mb-3">
              Why Partner With Us?
            </h3>
            <p className="text-gray-800 text-xs leading-relaxed">
              Kiyucart connects you with thousands of hungry customers daily,
              providing a reliable platform to grow your food business with
              ease. Our dedicated support and secure payment system ensure a
              hassle-free experience.
            </p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="order-1 md:order-2">
          <PartnerWithUsForm />
        </div>
      </div>

      {/* Why partner section */}
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto mt-32 px-4 md:px-0">
        <Heading
          title="Why should you partner with Kiyucart?"
          subtitle="Partnering with Kiyucart gives you access to a large customer base,
            marketing support, and a reliable platform to grow your food business.
            We handle order scheduling, payments, and customer service so you can
            focus on delivering great food."
        />
        <div className="grid grid-cols-1 md:grid-cols-5 mt-16 gap-10">
          {[
            {
              icon: (
                <FaUsers className="mx-auto mb-4 text-yellow-500" size={48} />
              ),
              title: "Expand Reach",
              desc: "Expand your reach to thousands of customers in your city.",
            },
            {
              icon: (
                <FaClipboardList
                  className="mx-auto mb-4 text-yellow-500"
                  size={48}
                />
              ),
              title: "Easy Management",
              desc: "Easy-to-use vendor dashboard for managing orders and menu.",
            },
            {
              icon: (
                <FaMoneyCheckAlt
                  className="mx-auto mb-4 text-yellow-500"
                  size={48}
                />
              ),
              title: "Secure Payments",
              desc: "Secure and timely payments directly to your bank account.",
            },
            {
              icon: (
                <FaHeadset className="mx-auto mb-4 text-yellow-500" size={48} />
              ),
              title: "Dedicated Support",
              desc: "Dedicated support team to assist you anytime.",
            },
            {
              icon: (
                <FaBullhorn
                  className="mx-auto mb-4 text-yellow-500"
                  size={48}
                />
              ),
              title: "Marketing Boost",
              desc: "Marketing and promotional opportunities to boost your brand.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="text-center px-4 rounded-xl p-6 transition-transform transform "
            >
              {icon}
              <div className="flex justify-center items-end my-4 gap-2">
                <h1 className="text-lg text-gray-800 font-bold">{title}</h1>
              </div>
              <p className="text-sm text-gray-600 max-w-xl mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto mt-32 pb-20 px-4 md:px-0">
        <Heading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about partnering with Kiyucart."
        />

        <div className="space-y-4 mt-16">
          {faqs.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden transition-shadow"
              >
                <button
                  onClick={() => toggleIndex(i)}
                  className="w-full text-left p-4 flex justify-between items-center focus:outline-none hover:bg-yellow-50 transition cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-header-${i}`}
                >
                  <h3 className="font-semibold text-lg text-gray-900">{q}</h3>
                  <span
                    className={`transform transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    } text-yellow-500 text-2xl select-none`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-header-${i}`}
                  className={`px-6  text-gray-700 transition-max-height duration-500 ease-in-out ${
                    isOpen ? "max-h-96 pt-4 pb-6" : "max-h-0 pt-0 pb-0"
                  }`}
                  style={{ overflow: "hidden" }}
                >
                  <p className={`${isOpen ? "mt-2" : "mt-0"}`}>{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PartnerWithUs;
