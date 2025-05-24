import { Link } from "react-router-dom";
import { config } from "../common/config";
import ScrollToTop from "./ScrollToTop";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-0 grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold mb-4">Kiyucart</h2>
          <p className="text-gray-600 max-w-xs">
            Delivering the best food from your favorite restaurants right to
            your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-yellow-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="hover:text-yellow-500 transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/partner" className="hover:text-yellow-500 transition">
                Partner With Us
              </Link>
            </li>
            <li>
              <Link
                to="/our-services"
                className="hover:text-yellow-500 transition"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/order" className="hover:text-yellow-500 transition">
                Order Now
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/service/staffing-solution"
                className="hover:text-yellow-500 transition"
              >
                Staffing Solutions
              </Link>
            </li>
            <li>
              <Link
                to="/service/fssai-registration"
                className="hover:text-yellow-500 transition"
              >
                FSSAI Registration
              </Link>
            </li>
            <li>
              <Link
                to="/service/gst-registration"
                className="hover:text-yellow-500 transition"
              >
                GST Registration
              </Link>
            </li>
            <li>
              <Link
                to="/service/accounts-gst-return-filing"
                className="hover:text-yellow-500 transition"
              >
                Accounts & GST Return Filing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/disclaimer"
                className="hover:text-yellow-500 transition"
              >
                Disclaimer
              </Link>
            </li>
            <li>
              <Link
                to="/terms-and-conditions"
                className="hover:text-yellow-500 transition"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-yellow-500 transition"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/refund-policy"
                className="hover:text-yellow-500 transition"
              >
                Refund Policy
              </Link>
            </li>
            <li>
              <Link
                to="/cancellation-policy"
                className="hover:text-yellow-500 transition"
              >
                Cancellation Policy
              </Link>
            </li>
            <li>
              <Link
                to="/cookies-policy"
                className="hover:text-yellow-500 transition"
              >
                Cookies Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">{config.address}</p>
          <p className="mb-2 text-yellow-500">{config.supportEmail}</p>
        </div>

        {/* Social Media */}
        {/* <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-gray-600">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 transition text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 transition text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 transition text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 transition text-2xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div> */}
      </div>
      {/* Copyright */}
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-0 mt-12 border-t border-gray-300 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} All rights reserved. Managed By
        Kiyunet Technology
      </div>
      <ScrollToTop />
    </footer>
  );
};

export default Footer;
