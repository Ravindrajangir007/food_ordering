import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/auth/LoginForm";

import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/common/Layout";
import ProductList from "./components/products/ProductList";
import OrderList from "./components/orders/OrderList";
import PaymentList from "./components/payments/PaymentList";
import DeliveryCaptainManager from "./components/captain/DeliveryCaptainManager";
import VendorSettings from "./components/settings/VendorSettings";
import Product from "./components/products/Product";
import SchedulesList from "./components/Schedules/SchedulesList";
import VendorList from "./components/Vendors/VendorList";
import VendorDetails from "./components/Vendors/VendorDetails";
import VendorOnboardingRequests from "./components/Vendors/VendorOnboardingRequests";
import Customers from "./components/Customers/Customers";
import CustomerDetails from "./components/Customers/CustomerDetails";
import Categories from "./components/Categories/Categories";
import DeliverySlots from "./components/DeliverySlots/DeliverySlots";
import StaffingRequest from "./components/StaffingRequest/StaffingRequest";
import FssaiRegistration from "./components/ServiceRequests/FssaiRegistration";
import GstRegistration from "./components/ServiceRequests/GstRegistration";
import AccountsGstReturnFiling from "./components/ServiceRequests/AccountsGstReturnFiling";

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginForm />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/schedules"
        element={
          <Layout>
            <SchedulesList />
          </Layout>
        }
      />

      <Route
        path="/products"
        element={
          <Layout>
            <ProductList />
          </Layout>
        }
      />
      <Route
        path="/product"
        element={
          <Layout>
            <Product />
          </Layout>
        }
      />

      <Route
        path="/product/:productId"
        element={
          <Layout>
            <Product />
          </Layout>
        }
      />

      <Route
        path="/orders"
        element={
          <Layout>
            <OrderList />
          </Layout>
        }
      />
      <Route
        path="/vendors"
        element={
          <Layout>
            <VendorList />
          </Layout>
        }
      />
      <Route
        path="/vendorDetail"
        element={
          <Layout>
            <VendorDetails />
          </Layout>
        }
      />
      <Route
        path="/vendorOnboardingRequests"
        element={
          <Layout>
            <VendorOnboardingRequests />
          </Layout>
        }
      />
      <Route
        path="/customers"
        element={
          <Layout>
            <Customers />
          </Layout>
        }
      />
      <Route
        path="/customerDetail"
        element={
          <Layout>
            <CustomerDetails />
          </Layout>
        }
      />
      <Route
        path="/masters/categories"
        element={
          <Layout>
            <Categories />
          </Layout>
        }
      />
      <Route
        path="/masters/deliverySlots"
        element={
          <Layout>
            <DeliverySlots />
          </Layout>
        }
      />
      <Route
        path="/staffingRequest"
        element={
          <Layout>
            <StaffingRequest />
          </Layout>
        }
      />
      <Route
        path="/service/fssai-registration"
        element={
          <Layout>
            <FssaiRegistration />
          </Layout>
        }
      />
      <Route
        path="/service/gst-registration"
        element={
          <Layout>
            <GstRegistration />
          </Layout>
        }
      />
      <Route
        path="/service/accounts-gst-return-filling"
        element={
          <Layout>
            <AccountsGstReturnFiling />
          </Layout>
        }
      />

      <Route
        path="/payments"
        element={
          <Layout>
            <PaymentList />
          </Layout>
        }
      />
      <Route
        path="/delivery-captains"
        element={
          <Layout>
            <DeliveryCaptainManager />
          </Layout>
        }
      />

      <Route
        path="/settings"
        element={
          <Layout>
            <VendorSettings />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
