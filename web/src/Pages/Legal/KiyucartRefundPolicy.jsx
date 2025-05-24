import React, { useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Link } from "react-router-dom";
import { config } from "../../common/config";
import Heading from "../../Component/Heading";

const KiyucartRefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white">
      <Header border sticky />
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto bg-white text-gray-900 font-sans leading-relaxed px-3 md:px-0 py-6">
        <Heading
          title="Refund & Cancellation Policy"
          subtitle="Last updated on May 5, 2025."
          className="mb-10 italic"
          left
        />

        <p>
          At Kiyucart, operated by <strong>Kiyunet Technology</strong>, we
          strive to provide a seamless food ordering and scheduling experience.
          This Refund & Cancellation Policy outlines the terms and conditions
          under which refunds or cancellations may be considered and processed
          on our Platform www.kiyucart.com and Kiyucart mobile applications
          (collectively, the “Platform”).
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          1. Order Scheduling and Cancellation Before Vendor Confirmation
        </h2>
        <p className="mb-2 text-sm">
          Customers can schedule orders for future delivery slots. Such
          scheduled orders can be paused, resumed, or canceled by the Customer
          at any time{" "}
          <strong>up to 3-4 hours before the scheduled delivery time</strong>,
          i.e., before the order is sent to the Vendor for confirmation and
          preparation.
        </p>
        <p className="mb-2 text-sm">
          Cancellation requests made within this window will be accepted, and no
          charges will be applied for canceled scheduled orders.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          2. Order Confirmation by Vendor and Cancellation Restrictions
        </h2>
        <p className="mb-2 text-sm">
          Once the scheduled order is{" "}
          <strong>sent to the Vendor for confirmation</strong> (typically 3-4
          hours before the delivery slot), the Vendor confirms and begins
          preparation.
        </p>
        <p className="mb-2 text-sm">
          After Vendor confirmation, the order is considered{" "}
          <strong>final and cannot be canceled or refunded</strong> through
          Kiyucart.
        </p>
        <p className="mb-2 text-sm">
          Customers are strongly advised to review all order details, including
          items, quantities, delivery address, and scheduled time, before the
          order is sent to the Vendor.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">3. Refund Policy</h2>
        <p className="mb-2 text-sm">
          Kiyucart maintains a strict no-refund policy. Refunds are not provided
          for any orders once confirmed by the Vendor.
        </p>
        <p className="mb-2 text-sm">
          Any refund requests related to food quality, delivery issues, or
          incorrect orders must be addressed directly with the Vendor, who may
          consider refunds at their discretion.
        </p>
        <p className="mb-2 text-sm">
          Kiyucart may assist in facilitating communication between Customers
          and Vendors but does not guarantee refunds or compensation.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">4. Contact Us</h2>
        <p className="mb-2 text-sm">
          For any questions or concerns regarding this Refund & Cancellation
          Policy, please contact us at:
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

export default KiyucartRefundPolicy;
