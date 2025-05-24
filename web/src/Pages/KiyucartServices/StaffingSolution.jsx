import React, { useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Heading from "../../Component/Heading";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaHandshake,
  FaClock,
  FaStar,
  FaComments,
} from "react-icons/fa";

import PostJobForm from "./ServiceForms/PostJobForm";

const StaffingSolution = () => {
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
          title="Staffing Solutions"
          subtitle="Find skilled and reliable staff tailored to your restaurant’s needs. We handle recruitment, training, and placement so you can focus on your business."
          center
        />
      </div>
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-20 gap-10 md:gap-0">
          <div className="bg-white p-5 py-10 md:py-20 rounded-lg md:rounded-0 shadow-md space-y-10">
            <img
              src="/assets/img/role-collection-ot.png"
              className="mx-auto h-48 md:h-52"
              alt="Staff Roles"
            />

            <Heading
              title="Find the Perfect Staff for Your Restaurant"
              subtitle="Discover skilled professionals tailored to your unique needs. We
              make staffing simple, reliable, and efficient."
              center
            />
          </div>
          <div
            className="w-full sticky top-20  overflow-y-auto rounded-lg shadow-md"
            style={{ scrollbarWidth: "thin" }}
          >
            <PostJobForm />
          </div>
        </div>
      </div>
      <div className="bg-white/40 backdrop-blur-sm mt-20">
        <section className="max-w-6xl 2xl:max-w-7xl py-10 mx-auto px-4 md:px-0">
          <Heading
            title="Why Choose Kiyucart Staffing Solutions?"
            className="mb-12"
            center
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center px-4 md:px-0">
            {[
              {
                icon: (
                  <FaUsers size={48} className="mx-auto mb-4 text-yellow-400" />
                ),
                title: "Skilled Workforce",
                desc: "We provide trained and experienced staff who understand the hospitality industry and your unique needs.",
              },
              {
                icon: (
                  <FaChalkboardTeacher
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "Comprehensive Training",
                desc: "Our training programs ensure your staff are well-prepared to deliver excellent customer service and maintain hygiene standards.",
              },
              {
                icon: (
                  <FaHandshake
                    size={48}
                    className="mx-auto mb-4 text-yellow-400"
                  />
                ),
                title: "Flexible Hiring",
                desc: "Hire staff on-demand, part-time, or full-time with flexible contracts tailored to your operational needs.",
              },
              {
                icon: (
                  <FaClock size={40} className="mx-auto mb-3 text-yellow-400" />
                ),
                title: "Quick Deployment",
                desc: "We ensure rapid staffing solutions to meet your urgent requirements without compromising quality.",
              },
              {
                icon: (
                  <FaStar size={40} className="mx-auto mb-3 text-yellow-400" />
                ),
                title: "Quality Assurance",
                desc: "Continuous performance monitoring and feedback to maintain high standards.",
              },
              {
                icon: (
                  <FaComments
                    size={40}
                    className="mx-auto mb-3 text-yellow-400"
                  />
                ),
                title: "Dedicated Support",
                desc: "Our support team is always available to address your concerns and ensure smooth operations.",
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
        </section>
      </div>

      <section className="max-w-6xl 2xl:max-w-7xl mt-20 mx-auto px-4 md:px-0">
        <Heading
          title="How Our Staffing Service Works"
          className="mb-12"
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-800 px-4 md:px-0">
          {[
            {
              number: 1,
              title: "Consultation",
              description:
                "We understand your staffing requirements and preferences.",
            },
            {
              number: 2,
              title: "Recruitment",
              description:
                "We source and screen candidates to find the best fit.",
            },
            {
              number: 3,
              title: "Training",
              description:
                "Selected candidates undergo our hospitality training program.",
            },
            {
              number: 4,
              title: "Placement",
              description:
                "We deploy trained staff to your restaurant with ongoing support.",
            },
            {
              number: 5,
              title: "Feedback & Support",
              description:
                "Continuous monitoring and feedback to ensure satisfaction.",
            },
            {
              number: 6,
              title: "Ongoing Improvement",
              description:
                "We continuously refine our processes based on your feedback to serve you better.",
            },
          ].map(({ number, title, description }) => (
            <div
              key={number}
              className="flex flex-col items-start justify-center space-y-4 p-6 bg-gray-50 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-300"
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

      {/* Testimonials */}
      <section className="max-w-6xl 2xl:max-w-7xl mt-20 mx-auto px-3 sm:px-6 md:px-0 mb-20">
        <Heading title="What Our Clients Say" className="mb-12" center />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            Kiyucart’s staffing solutions helped us find reliable and
            professional staff quickly. Their training program really shows in
            the quality of service.
            <footer className="mt-4 font-semibold text-yellow-500">
              - Ramesh Kumar, Restaurant Owner
            </footer>
          </blockquote>
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            The flexible hiring options allowed us to scale our staff during
            peak seasons without hassle. Excellent support throughout!
            <footer className="mt-4 font-semibold text-yellow-500">
              - Priya Singh, Cafe Manager
            </footer>
          </blockquote>
          <blockquote className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 italic text-gray-800 relative before:absolute before:-top-5 before:left-5 before:text-yellow-400 before:text-6xl before:content-['“']">
            The team at Kiyucart provided exceptional staffing support that
            helped us maintain high service standards even during busy times.
            Highly recommended!
            <footer className="mt-4 font-semibold text-yellow-500">
              - Anjali Mehta, Restaurant Manager
            </footer>
          </blockquote>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StaffingSolution;
