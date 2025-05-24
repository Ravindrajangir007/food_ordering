import React, { useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Link } from "react-router-dom";
import { config } from "../../common/config";
import Heading from "../../Component/Heading";

const KiyucartPrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white">
      <Header border sticky />
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto bg-white text-gray-900 font-sans leading-relaxed px-3 md:px-0 py-6">
        <Heading
          title="Privacy Policy"
          subtitle="Last updated on May 5, 2025."
          className="mb-10 italic"
          left
        />

        <p>
          Kiyucart, operated by <strong>Kiyunet Technology</strong>, respects
          your privacy and is committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our website www.kiyucart.com
          and Kiyucart mobile applications (collectively, the “Platform”). By
          accessing or using the Platform, you consent to the practices
          described in this policy.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          1. Information We Collect
        </h2>
        <p className="mb-2 text-sm">
          We collect various types of information to provide and improve our
          services, including:
        </p>
        <ul className="list-disc list-inside mb-2 text-sm space-y-2">
          <li>
            <strong>Personal Identification Information:</strong> Name, email
            address, phone number, delivery address, and other contact details
            you provide during registration or order placement.
          </li>
          <li>
            <strong>Location Information:</strong> With your permission, we
            collect your device’s location data to facilitate order delivery and
            improve service accuracy.
          </li>
          <li>
            <strong>Payment Information:</strong> Payment details processed
            securely through third-party payment gateways. We do not store your
            payment card information.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you use the
            Platform, including pages visited, features used, and interaction
            data collected through cookies and similar technologies.
          </li>
          <li>
            <strong>Device Information:</strong> Information about your device,
            operating system, browser type, IP address, and other technical
            data.
          </li>
        </ul>

        <h2 className="text-lg font-bold mt-7 mb-1">
          2. How We Use Your Information
        </h2>
        <p className="mb-2 text-sm">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-2 text-sm space-y-2">
          <li>To process and fulfill your orders efficiently.</li>
          <li>
            To communicate with you regarding your orders, account, and customer
            support.
          </li>
          <li>
            To personalize your experience and improve our Platform’s
            functionality.
          </li>
          <li>
            To send you promotional materials, offers, and updates, subject to
            your marketing preferences.
          </li>
          <li>
            To detect, prevent, and address technical issues, fraud, or
            unauthorized activities.
          </li>
          <li>
            To comply with legal obligations and enforce our Terms and policies.
          </li>
        </ul>

        <h2 className="text-lg font-bold mt-7 mb-1">
          3. Information Sharing and Disclosure
        </h2>
        <p className="mb-2 text-sm">
          We do not sell or rent your personal information to third parties. We
          may share your information in the following circumstances:
        </p>
        <ul className="list-disc list-inside mb-2 text-sm space-y-2">
          <li>
            <strong>With Vendors:</strong> To facilitate order processing and
            delivery, we share necessary information such as your name, address,
            and contact details with the relevant Vendors.
          </li>
          <li>
            <strong>With Service Providers:</strong> We may share information
            with trusted third-party service providers who assist us in
            operating the Platform, such as payment processors, delivery
            partners, and analytics providers.
          </li>
          <li>
            <strong>For Legal Compliance:</strong> When required by law,
            regulation, or legal process, or to protect the rights, property, or
            safety of Kiyucart, our users, or others.
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with any merger,
            acquisition, or sale of assets involving Kiyucart.
          </li>
        </ul>

        <h2 className="text-lg font-bold mt-7 mb-1">
          4. Cookies and Tracking Technologies
        </h2>
        <p className="mb-2 text-sm">
          We use cookies, web beacons, and similar tracking technologies to
          collect usage data and enhance your experience on the Platform.
          Cookies help us remember your preferences, analyze site traffic, and
          deliver personalized content.
        </p>
        <p className="mb-2 text-sm">
          You can control or disable cookies through your browser settings;
          however, some features of the Platform may not function properly if
          cookies are disabled.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">5. Data Security</h2>
        <p className="mb-2 text-sm">
          We implement appropriate technical and organizational measures to
          protect your personal data against unauthorized access, alteration,
          disclosure, or destruction. These include encryption, secure servers,
          and access controls.
        </p>
        <p className="mb-2 text-sm">
          Despite our efforts, no method of transmission over the internet or
          electronic storage is 100% secure. We cannot guarantee absolute
          security of your data.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          6. Your Rights and Choices
        </h2>
        <p className="mb-2 text-sm">You have the right to:</p>
        <ul className="list-disc list-inside mb-2 text-sm space-y-2">
          <li>Access and obtain a copy of your personal data.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>
            Request deletion of your personal data, subject to legal and
            operational limitations.
          </li>
          <li>
            Opt-out of marketing communications at any time by following the
            unsubscribe instructions or contacting us.
          </li>
          <li>Withdraw consent where processing is based on consent.</li>
        </ul>
        <p className="mb-2 text-sm">
          To exercise these rights, please contact us using the details provided
          below.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">7. Children’s Privacy</h2>
        <p className="mb-2 text-sm">
          The Platform is not intended for use by children under the age of 18.
          We do not knowingly collect personal information from children under
          18. If we become aware that we have collected such information, we
          will take steps to delete it promptly.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">8. International Users</h2>
        <p className="mb-2 text-sm">
          If you are accessing the Platform from outside India, please be aware
          that your information may be transferred to, stored, and processed in
          India where our servers are located. By using the Platform, you
          consent to such transfer and processing.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          9. Third-Party Links and Services
        </h2>
        <p className="mb-2 text-sm">
          The Platform may contain links to third-party websites or services.
          Kiyucart does not endorse and is not responsible for the content,
          privacy policies, or practices of any third parties.
        </p>
        <p className="mb-2 text-sm">
          Your interactions with third parties are solely between you and the
          third party.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">10. Data Retention</h2>
        <p className="mb-2 text-sm">
          We retain your personal data only as long as necessary to provide
          services, comply with legal obligations, resolve disputes, and enforce
          our agreements.
        </p>
        <p className="mb-2 text-sm">
          When data is no longer needed, we securely delete or anonymize it.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          11. Changes to This Privacy Policy
        </h2>
        <p className="mb-2 text-sm">
          We may update this Privacy Policy from time to time. Changes will be
          posted on the Platform with an updated effective date. We encourage
          you to review this policy periodically.
        </p>
        <p className="mb-2 text-sm">
          Your continued use of the Platform after changes constitutes
          acceptance of the updated Privacy Policy.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">12. Contact Us</h2>
        <p className="mb-2 text-sm">
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or your personal data, please contact us at:
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

export default KiyucartPrivacyPolicy;
