import React, { useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { config } from "../../common/config";
import { Link } from "react-router-dom";
import Heading from "../../Component/Heading";

const KiyucartCancellationPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white">
      <Header border sticky />
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto bg-white text-gray-900 font-sans leading-relaxed px-3 md:px-0 py-6">
        <Heading
          title="Cancellation Policy"
          subtitle="Last updated on May 5, 2025."
          className="mb-10 italic"
          left
        />

        <p>
          At Kiyucart, operated by <strong>Kiyunet Technology</strong>, we
          understand that plans can change. This Cancellation Policy outlines
          the terms and conditions under which Customers may cancel orders
          placed through our Platform www.kiyucart.com and Kiyucart mobile
          applications (collectively, the “Platform”).
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          1. Cancellation of Scheduled Orders
        </h2>
        <p className="mb-2 text-sm">
          Customers may pause, resume, or cancel scheduled orders at any time
          prior to the order being dispatched to the Vendor for preparation.
        </p>
        <p className="mb-2 text-sm">
          To cancel a scheduled order, Customers must use the cancellation
          feature available on the Platform or contact customer support before
          the dispatch time.
        </p>
        <p className="mb-2 text-sm">
          Once an order has been dispatched or accepted by the Vendor for
          preparation, cancellation is not permitted.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          2. Refunds on Cancellations
        </h2>
        <p className="mb-2 text-sm">
          Kiyucart maintains a strict no-refund policy. Cancellations made
          before dispatch may not be eligible for refunds or credits.
        </p>
        <p className="mb-2 text-sm">
          Any refund or credit, if applicable, is at the sole discretion of the
          Vendor and subject to their policies.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          3. Cancellation by Kiyucart or Vendors
        </h2>
        <p className="mb-2 text-sm">
          Kiyucart or Vendors reserve the right to cancel any order due to
          operational constraints, unavailability of items, or violation of
          these Terms.
        </p>
        <p className="mb-2 text-sm">
          In such cases, Customers will be notified promptly, and any payments
          made will be refunded as per Vendor policies.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          4. How to Cancel an Order
        </h2>
        <p className="mb-2 text-sm">
          Customers can cancel scheduled orders via the Platform’s order
          management interface or by contacting customer support.
        </p>
        <p className="mb-2 text-sm">
          It is recommended to cancel orders well in advance to avoid
          inconvenience.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          5. Limitation of Liability
        </h2>
        <p className="mb-2 text-sm">
          Kiyucart disclaims all liability for any losses or damages arising
          from order cancellations.
        </p>
        <p className="mb-2 text-sm">
          Customers agree that Kiyucart’s maximum liability shall not exceed the
          amount paid for the canceled order.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          6. Changes to This Cancellation Policy
        </h2>
        <p className="mb-2 text-sm">
          Kiyucart reserves the right to update or modify this Cancellation
          Policy at any time without prior notice.
        </p>
        <p className="mb-2 text-sm">
          Updated policies will be posted on the Platform with an effective
          date. Continued use of the Platform after changes constitutes
          acceptance of the updated policy.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">7. Contact Us</h2>
        <p className="mb-2 text-sm">
          For any questions or concerns regarding this Cancellation Policy,
          please contact us at:
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

export default KiyucartCancellationPolicy;
