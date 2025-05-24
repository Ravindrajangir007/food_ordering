import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import KiyucartTerms from "./Pages/Legal/KiyucartTerms";
import KiyucartPrivacyPolicy from "./Pages/Legal/KiyucartPrivacyPolicy";
import KiyucartRefundPolicy from "./Pages/Legal/KiyucartRefundPolicy";
import KiyucartCookiesPolicy from "./Pages/Legal/KiyucartCookiesPolicy";
import KiyucartCancellationPolicy from "./Pages/Legal/KiyucartCancellationPolicy";
import KiyucartDisclaimer from "./Pages/Legal/KiyucartDisclaimer";
import PartnerWithUs from "./Pages/PartnerWithUs/PartnerWithUs";
import OurServices from "./Pages/KiyucartServices/OurServices";
import StaffingSolution from "./Pages/KiyucartServices/StaffingSolution";
import FssaiRegistration from "./Pages/KiyucartServices/FssaiRegistration";
import GstRegistration from "./Pages/KiyucartServices/GstRegistration";
import AccountsGstReturnFiling from "./Pages/KiyucartServices/AccountsGstReturnFiling";
import NotFound from "./Pages/NotFound";
import InternetLoss from "./Pages/InternetLoss"; // Import your InternetLoss component

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    // Show InternetLoss page when offline
    return <InternetLoss />;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/disclaimer" element={<KiyucartDisclaimer />} />
          <Route path="/terms-and-conditions" element={<KiyucartTerms />} />
          <Route path="/privacy-policy" element={<KiyucartPrivacyPolicy />} />
          <Route path="/refund-policy" element={<KiyucartRefundPolicy />} />
          <Route path="/cookies-policy" element={<KiyucartCookiesPolicy />} />
          <Route
            path="/cancellation-policy"
            element={<KiyucartCancellationPolicy />}
          />
          {/* Kiyucart Services */}
          <Route path="/our-services" element={<OurServices />} />
          <Route
            path="/service/staffing-solution"
            element={<StaffingSolution />}
          />
          <Route
            path="/service/fssai-registration"
            element={<FssaiRegistration />}
          />
          <Route
            path="/service/gst-registration"
            element={<GstRegistration />}
          />
          <Route
            path="/service/accounts-gst-return-filing"
            element={<AccountsGstReturnFiling />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
