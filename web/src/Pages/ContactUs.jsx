import React, { useEffect, useState } from "react";
import Footer from "../Component/Footer";
import Header from "../Component/Header";
import Heading from "../Component/Heading";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const faqData = [
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach us via email at support@kiyucart.com or use the contact form on this page.",
  },
  {
    question: "What are your office hours?",
    answer: "Our office hours are Monday to Friday, 9 AM to 6 PM IST.",
  },
  {
    question: "Where are your offices located?",
    answer:
      "We have offices in Gurugram, Delhi, and Mumbai. See the locations section below for details.",
  },
  {
    question: "How long does it take to get a response?",
    answer:
      "Our support team typically responds within 24 hours on business days.",
  },
];

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      valid = false;
    } else {
      const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit mobile number
      if (!phoneRegex.test(formData.mobile.replace(/\D/g, ""))) {
        newErrors.mobile = "Invalid mobile number";
        valid = false;
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
        valid = false;
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill all the mandatory fields");
      return;
    }

    // API call can be added here
    toast.success("Message sent successfully!");
    setFormData({
      name: "",
      mobile: "",
      email: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <>
      <div
        className="min-h-screen relative bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/img/bg-1.png')" }}
      >
        {/* Header */}
        <Header sticky border />

        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl 2xl:max-w-7xl mx-auto relative z-10 items-center mt-10 md:mt-20 px-4 md:px-0 gap-10">
          <div className="space-y-10 order-2 md:order-1">
            <Heading
              left
              title="Customer Support"
              subtitle="Egestas sed tempus urna et pharetra pharetra massa. Fermentum posuere urna nec tincidunt praesent semper."
            />
            <div className="flex justify-center md:justify-start items-center gap-4 ">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex justify-center items-center text-white text-xl">
                <FaEnvelope />
              </div>
              <Link
                to="mailto:support@kiyucart.com"
                className="text-yellow-500 text-xl font-semibold"
              >
                support@kiyucart.com
              </Link>
            </div>
            <div className="flex flex-col justify-center md:justify-start items-center md:items-start gap-4">
              <h1 className="text-xl text-gray-900 font-bold capitalize">
                Find us on
              </h1>
              <div className="flex justify-start items-center gap-3">
                <Link to="#" className="text-yellow-500 text-xl font-semibold">
                  <FaFacebook />
                </Link>
                <Link to="#" className="text-yellow-500 text-xl font-semibold">
                  <FaInstagram />
                </Link>
                <Link to="#" className="text-yellow-500 text-xl font-semibold">
                  <FaLinkedin />
                </Link>
                <Link to="#" className="text-yellow-500 text-xl font-semibold">
                  <FaXTwitter />
                </Link>
                <Link to="#" className="text-yellow-500 text-xl font-semibold">
                  <FaPinterest />
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center md:justify-start  items-center md:items-start gap-4">
              <h1 className="text-xl text-gray-900 font-bold capitalize">
                Gurugram Office
              </h1>
              <p className="text-gray-800 font-semibold text-center md:text-left">
                618 P, Durga Colony, Jharsa Village, Sector 39, Gurugram,
                Haryana 122003, India
              </p>
            </div>
          </div>

          <div className="  order-1 md:order-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white/50 border-2 border-white py-5 px-5 rounded-xl space-y-4"
              noValidate
            >
              <h1 className="text-gray-800 text-xl font-bold text-center">
                Get in Touch
              </h1>
              <input
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`bg-white/80 border rounded-xl w-full p-3 shadow text-sm ${
                  errors.name ? "border-red-500" : "border-white"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}

              <input
                type="tel"
                placeholder="Enter Mobile No"
                value={formData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                className={`bg-white/80 border rounded-xl w-full p-3 shadow text-sm ${
                  errors.mobile ? "border-red-500" : "border-white"
                }`}
              />
              {errors.mobile && (
                <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>
              )}

              <input
                type="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`bg-white/80 border rounded-xl w-full p-3 shadow text-sm ${
                  errors.email ? "border-red-500" : "border-white"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}

              <textarea
                rows={5}
                placeholder="Enter Message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={`bg-white/80 border rounded-xl w-full p-3 shadow text-sm ${
                  errors.message ? "border-red-500" : "border-white"
                }`}
              />
              {errors.message && (
                <p className="text-red-600 text-xs mt-1">{errors.message}</p>
              )}

              <p className="text-sm font-semibold text-gray-800 text-center">
                By contacting us you agree to the
                <Link to="#" className="text-yellow-500 mx-2">
                  Terms and Conditions
                </Link>
                and
                <Link to="#" className="text-yellow-500 mx-2">
                  Privacy Policy
                </Link>
              </p>
              <button
                type="submit"
                className="bg-yellow-500 rounded-xl px-4 py-2 text-sm text-white w-full cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-0 mt-32 pb-20">
          <Heading
            title=" Frequently Asked Questions"
            className="mb-10"
            center
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map(({ question, answer }, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-xl shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 text-left text-gray-900 font-semibold focus:outline-none"
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  {question}
                  {openFaqIndex === index ? (
                    <FaChevronUp className="text-yellow-400" />
                  ) : (
                    <FaChevronDown className="text-yellow-400" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="p-4 pt-0 text-gray-700 text-sm border-t border-gray-300"
                  >
                    {answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ContactUs;
