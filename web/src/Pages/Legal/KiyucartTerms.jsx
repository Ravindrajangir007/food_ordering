import React, { useEffect } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Link } from "react-router-dom";
import { config } from "../../common/config";
import Heading from "../../Component/Heading";

const KiyucartTerms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white">
      <Header border sticky />
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto bg-white text-gray-900 font-sans leading-relaxed px-3 md:px-0 py-6">
        <Heading
          title="Terms and Conditions"
          subtitle="Last updated on May 5, 2025."
          className="mb-10 italic"
          left
        />

        <p className="mb-6">
          Welcome to Kiyucart, a food ordering and scheduling platform operated
          by <strong>Kiyunet Technology</strong>, a proprietorship company
          registered under the laws of India. These Terms and Conditions
          (“Terms”) govern your access to and use of our website
          www.kiyucart.com and Kiyucart mobile applications (collectively, the
          “Platform”). By accessing or using the Platform, you acknowledge that
          you have read, understood, and agree to be bound by these Terms. If
          you do not agree to these Terms, please refrain from using the
          Platform.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          1. Introduction and Acceptance
        </h2>
        <p className="mb-4 text-sm">
          These Terms constitute a legally binding agreement between you
          (“User”, “Customer”, or “You”) and Kiyunet Technology (“Kiyucart”,
          “We”, “Us”, or “Our”). By accessing or using the Platform, you agree
          to comply with and be bound by these Terms, our Privacy Policy, and
          any other policies posted on the Platform. If you do not agree to
          these Terms, you must not use the Platform.
        </p>
        <p className="mb-6 text-sm">
          We reserve the right to update or modify these Terms at any time
          without prior notice. Your continued use of the Platform after such
          changes constitutes your acceptance of the new Terms. It is your
          responsibility to review these Terms periodically.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          2. About Kiyucart and Our Services
        </h2>
        <p className="mb-6 text-sm">
          Kiyucart is a technology platform that connects Customers with
          restaurants and vendors (“Vendors”) for ordering and scheduling food
          and related products. Kiyucart acts solely as an intermediary and does
          not prepare, package, or deliver food. All such services are provided
          exclusively by the Vendors.
        </p>
        <p className="mb-6 text-sm">
          The Platform enables Customers to place orders, schedule deliveries,
          and manage their orders. Delivery services, if any, are provided by
          Vendors or third-party delivery partners engaged by Vendors. Kiyucart
          does not guarantee the availability, quality, or timeliness of any
          product or service.
        </p>
        <p className="mb-6 text-sm">
          Kiyucart does not assume any responsibility or liability for any acts
          or omissions of Vendors or delivery partners, including but not
          limited to food safety, hygiene, or delivery delays.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          3. User Eligibility and Account Registration
        </h2>
        <p className="mb-6 text-sm">
          To use the Platform, you must be at least 18 years old and capable of
          entering into a legally binding contract. By registering an account,
          you agree to provide accurate, current, and complete information and
          to update it as necessary.
        </p>
        <p className="mb-6 text-sm">
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account. You agree to notify Kiyucart immediately of any unauthorized
          use or security breach.
        </p>
        <p className="mb-6 text-sm">
          Kiyucart reserves the right to suspend or terminate accounts that
          violate these Terms or engage in fraudulent or abusive behavior.
        </p>
        <p className="mb-6 text-sm">
          You agree not to use the Platform for any unlawful or prohibited
          activities, including but not limited to fraudulent transactions,
          spamming, or infringing intellectual property rights.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          4. Order Placement, Scheduling, and Management
        </h2>
        <p className="mb-6 text-sm">
          Customers can place orders for food and related products through the
          Platform. The Platform allows scheduling of orders for future dates
          and times, including recurring orders.
        </p>
        <p className="mb-6 text-sm">
          Customers may pause, resume, or cancel scheduled orders prior to
          dispatch. It is the Customer’s responsibility to ensure the accuracy
          of order details and schedules.
        </p>
        <p className="mb-6 text-sm">
          Kiyucart forwards orders to Vendors strictly according to the
          Customer’s schedule. Kiyucart does not modify, expedite, or delay
          orders without explicit Customer instruction.
        </p>
        <p className="mb-6 text-sm">
          Kiyucart reserves the right to reject or cancel any order if it
          violates these Terms, if the Vendor is unable to fulfill the order, or
          due to operational constraints.
        </p>
        <p className="mb-6 text-sm">
          Customers acknowledge that scheduled orders are subject to acceptance
          by Vendors. Kiyucart does not guarantee acceptance of any scheduled
          order and reserves the right to reject or cancel orders at its
          discretion.
        </p>
        <p className="mb-6 text-sm">
          Customers are responsible for providing accurate delivery information
          and ensuring availability to receive orders at the scheduled time.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          5. Pricing, Payment, and Taxes
        </h2>
        <p className="mb-6 text-sm">
          All prices displayed on the Platform include applicable taxes unless
          otherwise stated. Prices and availability are subject to change
          without notice.
        </p>
        <p className="mb-6 text-sm">
          Payments must be made through the payment methods provided on the
          Platform. Kiyucart uses secure third-party payment gateways and does
          not store payment information.
        </p>
        <p className="mb-6 text-sm">
          You agree to pay all charges incurred at the prices in effect when the
          charges are incurred. Any disputes regarding payments must be raised
          with the payment provider or Vendor as applicable.
        </p>
        <p className="mb-6 text-sm">
          Kiyucart is not responsible for any payment disputes or chargebacks
          between Customers and Vendors.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          6. Refund and Cancellation Policy
        </h2>
        <p className="mb-6 text-sm">
          Kiyucart maintains a strict no-refund policy. Once an order is placed
          and confirmed, it cannot be canceled for a refund through the
          Platform.
        </p>
        <p className="mb-6 text-sm">
          Customers are advised to review their orders carefully before placing
          them. In case of issues such as food quality, delivery delays, or
          incorrect items, Customers must contact the Vendor directly.
        </p>
        <p className="mb-6 text-sm">
          Refunds, if any, are subject to the Vendor’s policies and discretion.
          Kiyucart does not guarantee refunds or compensation and disclaims any
          liability in this regard.
        </p>
        <p className="mb-6 text-sm">
          Kiyucart may facilitate communication between Customers and Vendors to
          resolve disputes but is not obligated to provide refunds or
          compensation.
        </p>
        <p className="mb-6 text-sm">
          Cancellation of scheduled orders must be done before the order is
          dispatched to the Vendor. Once dispatched, cancellations are not
          permitted.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          7. Complaints, Feedback, and Dispute Resolution
        </h2>
        <p className="mb-6 text-sm">
          Customers may submit complaints or feedback through the Platform’s
          customer support channels. Kiyucart will forward complaints to the
          relevant Vendor but will not take unilateral action without Vendor
          consent.
        </p>
        <p className="mb-6 text-sm">
          Disputes between Customers and Vendors are to be resolved directly.
          Kiyucart acts only as a facilitator and disclaims responsibility for
          dispute outcomes.
        </p>
        <p className="mb-6 text-sm">
          Vendors with repeated complaints or violations may have their access
          to the Platform suspended or terminated.
        </p>
        <p className="mb-6 text-sm">
          Users agree to cooperate in good faith with Kiyucart and Vendors to
          resolve any disputes and provide all necessary information and
          documentation to facilitate resolution.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          8. Data Collection, Use, and Privacy
        </h2>
        <p className="mb-6 text-sm">
          Kiyucart collects personal information including name, mobile number,
          email, and location permissions to facilitate order processing and
          delivery.
        </p>
        <p className="mb-6 text-sm">
          This data is also used for communication, marketing, and service
          improvement. Customers may opt out of marketing communications.
        </p>
        <p className="mb-6 text-sm">
          Kiyucart employs industry-standard security measures to protect your
          data. Data will not be shared with third parties without consent,
          except as necessary to fulfill orders or comply with law.
        </p>
        <p className="mb-6 text-sm">
          Customers have rights to access, update, or request deletion of their
          personal data by contacting support.
        </p>
        <p className="mb-6 text-sm">
          For more details, please refer to our Privacy Policy available on the
          Platform.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          9. Vendor Branding, Exclusivity, and Partnership
        </h2>
        <p className="mb-6 text-sm">
          Vendors can build and promote their brand on Kiyucart. By joining,
          Vendors commit to a 10-year exclusivity period during which they shall
          not leave the Platform.
        </p>
        <p className="mb-6 text-sm">
          If a Vendor exits before this period, Kiyucart retains rights to all
          branding, intellectual property, and customer goodwill created on the
          Platform. Vendors cannot independently leverage such branding outside
          the Platform.
        </p>
        <p className="mb-6 text-sm">
          This exclusivity protects investments and ensures consistent service
          quality.
        </p>
        <p className="mb-6 text-sm">
          Vendors must comply with all applicable laws and maintain product and
          service quality.
        </p>
        <p className="mb-6 text-sm">
          Vendors shall not engage in any activity that harms the reputation or
          interests of Kiyucart or other Vendors.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          10. Limitation of Liability and Indemnity
        </h2>
        <p className="mb-6 text-sm">
          Kiyucart acts only as an intermediary and disclaims liability for the
          quality, safety, legality, or delivery of food or services by Vendors.
          All transactions are directly between Customers and Vendors.
        </p>
        <p className="mb-6 text-sm">
          Kiyucart disclaims all warranties and shall not be liable for any
          damages arising from use of the Platform.
        </p>
        <p className="mb-6 text-sm">
          You agree to indemnify Kiyucart and Kiyunet Technology against claims
          arising from your use of the Platform or violation of these Terms.
        </p>
        <p className="mb-6 text-sm">
          Kiyucart shall not be liable for any indirect, incidental,
          consequential, or punitive damages, including loss of profits or data.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          11. Intellectual Property Rights
        </h2>
        <p className="mb-6 text-sm">
          All content, trademarks, logos, and intellectual property on the
          Platform belong to Kiyucart, Kiyunet Technology, or licensors.
          Unauthorized use is prohibited.
        </p>
        <p className="mb-6 text-sm">
          You may not use any content from the Platform for commercial purposes
          without prior written consent.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          12. Third-Party Links and Services
        </h2>
        <p className="mb-6 text-sm">
          The Platform may contain links to third-party websites or services.
          Kiyucart does not endorse and is not responsible for the content,
          privacy policies, or practices of any third parties.
        </p>
        <p className="mb-6 text-sm">
          Your interactions with third parties are solely between you and the
          third party.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">13. Force Majeure</h2>
        <p className="mb-6 text-sm">
          Kiyucart shall not be liable for any failure or delay in performance
          due to causes beyond its reasonable control, including but not limited
          to natural disasters, pandemics, strikes, or government actions.
        </p>
        <p className="mb-6 text-sm">
          In such events, Kiyucart may suspend or terminate services temporarily
          or permanently without liability.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">14. Termination</h2>
        <p className="mb-6 text-sm">
          Kiyucart may suspend or terminate your access to the Platform at any
          time for violation of these Terms or for any reason without prior
          notice.
        </p>
        <p className="mb-6 text-sm">
          Upon termination, your rights to use the Platform will cease
          immediately.
        </p>
        <p className="mb-6 text-sm">
          Termination shall not affect any rights or liabilities accrued prior
          to termination.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">
          15. Governing Law and Jurisdiction
        </h2>
        <p className="mb-6 text-sm">
          These Terms are governed by and constructed in accordance with the
          laws of India and subject to the exclusive jurisdiction of courts of
          Gurugram, Haryana.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">16. Severability</h2>
        <p className="mb-6 text-sm">
          If any provision is found invalid or unenforceable, the remaining
          provisions shall remain in full force.
        </p>

        <h2 className="text-lg font-bold mt-7 mb-1">17. Contact Us</h2>
        <p className="mb-6 text-sm">
          For any questions, concerns, or grievances, please contact Kiyunet
          Technology:
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

export default KiyucartTerms;
