import React, { useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { config } from "../../common/config";
import { Link } from "react-router-dom";
import Heading from "../../Component/Heading";

const KiyucartCookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white">
      <Header border sticky />
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto bg-white text-gray-900 font-sans leading-relaxed px-3 md:px-0 py-6">
        <Heading
          title="Cookies Policy"
          subtitle="Last updated on May 5, 2025."
          className="mb-10 italic"
          left
        />

        <p>
          Kiyucart, operated by <strong>Kiyunet Technology</strong>, uses
          cookies and similar tracking technologies on our website
          www.kiyucart.com and Kiyucart mobile applications (collectively, the
          “Platform”) to enhance your user experience, analyze usage, and
          provide personalized services. This Cookies Policy explains what
          cookies are, how we use them, and your choices regarding their use.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">1. What Are Cookies?</h2>
        <p className="mb-2 text-sm">
          Cookies are small text files stored on your device (computer,
          smartphone, or tablet) by your web browser when you visit a website.
          They help websites remember your preferences, login information, and
          other details to improve your browsing experience.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          2. Types of Cookies We Use
        </h2>
        <ul className="list-disc list-inside mb-2 text-sm space-y-2">
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary for
            the Platform to function properly. They enable core features such as
            user authentication, order processing, and security.
          </li>
          <li>
            <strong>Performance Cookies:</strong> These cookies collect
            anonymous information about how users interact with the Platform,
            such as pages visited and error messages, helping us improve
            performance.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> These cookies remember your
            preferences and settings, such as language or location, to provide a
            personalized experience.
          </li>
          <li>
            <strong>Advertising and Targeting Cookies:</strong> These cookies
            are used to deliver relevant advertisements and track the
            effectiveness of marketing campaigns. They may be set by third-party
            advertising partners.
          </li>
        </ul>

        <h2 className="text-lg font-bold mt-7 mb-1">3. How We Use Cookies</h2>
        <p className="mb-2 text-sm">We use cookies to:</p>
        <ul className="list-disc list-inside mb-2 text-sm space-y-2">
          <li>Enable essential Platform functions and security.</li>
          <li>Analyze usage patterns to improve our services.</li>
          <li>Remember your preferences and settings.</li>
          <li>Deliver personalized content and advertisements.</li>
          <li>Measure the effectiveness of marketing campaigns.</li>
        </ul>

        <h2 className="text-lg font-bold mt-7 mb-1">4. Third-Party Cookies</h2>
        <p className="mb-2 text-sm">
          We may allow third-party service providers, such as analytics and
          advertising partners, to place cookies on your device through the
          Platform. These third parties collect information according to their
          own privacy policies.
        </p>
        <p className="mb-2 text-sm">
          We do not control these third-party cookies and recommend reviewing
          their policies for more information.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">5. Your Cookie Choices</h2>
        <p className="mb-2 text-sm">
          You can manage or disable cookies through your browser settings. Most
          browsers allow you to refuse or delete cookies; however, disabling
          cookies may affect the functionality and user experience of the
          Platform.
        </p>
        <p className="mb-2 text-sm">
          For detailed instructions on managing cookies, please refer to your
          browser’s help section.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          6. Changes to This Cookies Policy
        </h2>
        <p className="mb-2 text-sm">
          We may update this Cookies Policy from time to time to reflect changes
          in our practices or legal requirements. Updated policies will be
          posted on the Platform with an effective date.
        </p>
        <p className="mb-2 text-sm">
          Your continued use of the Platform after changes constitutes
          acceptance of the updated Cookies Policy.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">7. Contact Us</h2>
        <p className="mb-2 text-sm">
          If you have any questions or concerns about our use of cookies, please
          contact us at:
        </p>
        <ul className="list-disc list-inside mb-20 text-sm">
          <li>
            Email:{" "}
            <Link
              to={`mailto:${config.supportEmail}`}
              className="text-blue-600 underline"
            >
              {config.supportEmail}
            </Link>
          </li>

          <li>Address: {config.address}</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default KiyucartCookiesPolicy;
