import React, { useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Link } from "react-router-dom";
import { config } from "../../common/config";
import Heading from "../../Component/Heading";

const KiyucartDisclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white">
      <Header border sticky />
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto bg-white text-gray-900  font-sans leading-relaxed px-3 md:px-0 py-6">
        <Heading
          title="Disclaimer"
          subtitle="Last updated on May 5, 2025."
          className="mb-10 italic"
          left
        />

        <p>
          The information provided by Kiyucart, operated by{" "}
          <strong>Kiyunet Technology</strong>, on the website www.kiyucart.com
          and Kiyucart mobile applications (collectively, the “Platform”) is for
          general informational purposes only. While we strive to keep the
          information up to date and correct, we make no representations or
          warranties of any kind, express or implied, about the completeness,
          accuracy, reliability, suitability, or availability with respect to
          the Platform or the information, products, services, or related
          graphics contained on the Platform for any purpose.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          1. No Professional Advice
        </h2>
        <p className="mb-2 text-sm">
          The content on the Platform is not intended to be a substitute for
          professional advice, including but not limited to medical, legal, or
          nutritional advice. Users should consult appropriate professionals for
          specific advice tailored to their situation.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          2. Vendor Responsibility
        </h2>
        <p className="mb-2 text-sm">
          Kiyucart acts solely as an intermediary platform connecting Customers
          with Vendors. We do not prepare, manufacture, or deliver any food or
          products. All Vendors are independent entities responsible for the
          quality, safety, and legality of their products and services.
        </p>
        <p className="mb-2 text-sm">
          Kiyucart disclaims any liability arising from the acts or omissions of
          Vendors, including but not limited to food safety, hygiene, delivery
          delays, or product quality.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          3. Limitation of Liability
        </h2>
        <p className="mb-2 text-sm">
          To the fullest extent permitted by law, Kiyucart and Kiyunet
          Technology shall not be liable for any direct, indirect, incidental,
          consequential, or punitive damages arising out of or related to your
          use of the Platform.
        </p>
        <p className="mb-2 text-sm">
          This includes, without limitation, damages for loss of profits,
          goodwill, use, data, or other intangible losses.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">4. External Links</h2>
        <p className="mb-2 text-sm">
          The Platform may contain links to third-party websites or services
          that are not owned or controlled by Kiyucart. We have no control over,
          and assume no responsibility for, the content, privacy policies, or
          practices of any third-party sites or services.
        </p>
        <p className="mb-2 text-sm">
          You acknowledge and agree that Kiyucart shall not be responsible or
          liable, directly or indirectly, for any damage or loss caused or
          alleged to be caused by or in connection with use of or reliance on
          any such content, goods, or services available on or through any such
          third-party sites or services.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          5. Changes to This Disclaimer
        </h2>
        <p className="mb-2 text-sm">
          Kiyucart reserves the right to update or modify this Disclaimer at any
          time without prior notice. Changes will be posted on the Platform with
          an updated effective date.
        </p>
        <p className="mb-2 text-sm">
          Your continued use of the Platform after changes constitutes
          acceptance of the updated Disclaimer.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">6. Contact Us</h2>
        <p className="mb-2 text-sm">
          If you have any questions or concerns about this Disclaimer, please
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

export default KiyucartDisclaimer;
