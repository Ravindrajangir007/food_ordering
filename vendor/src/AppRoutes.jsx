import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPassword from "./components/auth/ForgotPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/common/Layout";
import MenuPlanning from "./components/catering/MenuPlanning";

import MealSchedule from "./components/catering/MealSchedule";
import InventoryReport from "./components/reports/InventoryReport";
import SalesReport from "./components/reports/SalesReport";
import ProductList from "./components/products/ProductList";
import OrderList from "./components/orders/OrderList";
import PaymentList from "./components/payments/PaymentList";
import DeliveryCaptainManager from "./components/captain/DeliveryCaptainManager";
import Customers from "./components/customers/Customers";
import VendorSettings from "./components/settings/VendorSettings";

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Catering Routes */}
      <Route
        path="/catering/menu"
        element={
          <ProtectedRoute>
            <Layout>
              <MenuPlanning />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/catering/schedule"
        element={
          <ProtectedRoute>
            <Layout>
              <MealSchedule />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Report Routes */}
      <Route
        path="/reports/inventory"
        element={
          <ProtectedRoute>
            <Layout>
              <InventoryReport />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports/sales"
        element={
          <ProtectedRoute>
            <Layout>
              <SalesReport />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Layout>
              <ProductList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Layout>
              <OrderList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Layout>
              <PaymentList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/delivery-captains"
        element={
          <ProtectedRoute>
            <Layout>
              <DeliveryCaptainManager />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <Layout>
              <Customers />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <VendorSettings />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
