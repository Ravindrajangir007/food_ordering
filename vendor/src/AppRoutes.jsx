import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/auth/LoginForm";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/common/Layout";
import InventoryReport from "./components/reports/InventoryReport";
import SalesReport from "./components/reports/SalesReport";
import ProductList from "./components/products/ProductList";
import OrderList from "./components/orders/OrderList";
import PaymentList from "./components/payments/PaymentList";
import DeliveryCaptainManager from "./components/captain/DeliveryCaptainManager";
import VendorSettings from "./components/settings/VendorSettings";
import Product from "./components/products/Product";

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
          <ProtectedRoute>
            <Layout>
              <Dashboard />
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
        path="/product"
        element={
          <ProtectedRoute>
            <Layout>
              <Product />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:productId"
        element={
          <ProtectedRoute>
            <Layout>
              <Product />
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
