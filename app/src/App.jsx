import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Home from "./pages/Home";
import ProductDetail from "./pages/products/ProductDetail";
import More from "./pages/More";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import Wallet from "./pages/Wallet";
import Transactions from "./pages/Transcations";
import MyOrders from "./pages/orders/MyOrders";
import OrderDetails from "./pages/orders/OrderDetails";
import ReferAndEarn from "./pages/ReferAndEarn";
import AccountPreferences from "./pages/profile/AccountPreferences";
import NeedHelp from "./pages/NeedHelp";
import Legal from "./pages/Legal";
import MySchedule from "./pages/MySchedule";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { GoogleMapsProvider } from "./context/GoogleMapsContext";
import LocationPermissionModal from "./components/LocationPermissionModal";
import RestaurantDetails from "./pages/RestaurantDetails";
import { WalletProvider } from "./context/WalletContext";
import FoodStoryPage from "./pages/FoodStory/FoodStoryPage";
import AllFoodStories from "./pages/FoodStory/AllFoodStories";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkLocationServices = () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        () => {
          console.log("Location services are enabled.");
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setModalOpen(true);
          }
        }
      );
    };

    checkLocationServices();
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <LocationPermissionModal onClose={handleCloseModal} />}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "#4aed88",
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: "#ff4b4b",
            },
          },
        }}
      />
      <CartProvider>
        <WalletProvider>
          <GoogleMapsProvider>
            <BrowserRouter>
              {showSplash ? (
                <SplashScreen onComplete={() => setShowSplash(false)} />
              ) : !isLoggedIn ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <>
                  <Routes>
                    <Route path="/" element={<Home />} />

                    <Route
                      path="/:city/:slug"
                      element={<RestaurantDetails />}
                    />
                    <Route path="/more" element={<More />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/transactions" element={<Transactions />} />

                    <Route path="/orders" element={<MyOrders />} />
                    <Route path="/order" element={<OrderDetails />} />
                    <Route path="/my-schedule" element={<MySchedule />} />
                    <Route path="/refer-and-earn" element={<ReferAndEarn />} />

                    <Route
                      path="/account-preferences"
                      element={<AccountPreferences />}
                    />
                    <Route path="/need-help" element={<NeedHelp />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/food-stories" element={<AllFoodStories />} />
                    <Route
                      path="/food-story/:slug"
                      element={<FoodStoryPage />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>

                  {/* Add your BottomNavigation component here */}
                </>
              )}
            </BrowserRouter>
          </GoogleMapsProvider>
        </WalletProvider>
      </CartProvider>
    </>
  );
}

export default App;
