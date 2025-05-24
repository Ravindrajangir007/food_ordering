import React, { createContext, useContext, useState, useEffect } from "react";
import CartDiffVendorWarningModal from "../components/CartDiffVendorWarningModal";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("selected_address");
    localStorage.removeItem("selected_days");
    localStorage.removeItem("selected_slots");
    setShowModal(false);
  };

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    heading: "",
    message: "",
  });

  const addToCart = (item) => {
    localStorage.removeItem("selected_slots");
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + (item.quantity || 1);
        if (newQuantity <= 0) {
          return prevCart.filter((cartItem) => cartItem.id !== item.id);
        }
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );
      }

      if (prevCart.length > 0) {
        const firstItem = prevCart[0];
        if (firstItem.vendor_id !== item.vendor_id) {
          setModalContent({
            heading: "Items already in cart",
            message:
              "Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?",
          });

          setShowModal(true);
          return prevCart; // Prevent adding the item
        }
      }

      return [...prevCart, { ...item, quantity: item.quantity || 1 }];
    });
  };

  useEffect(() => {
    const total = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(total);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const getCartCategories = () => {
    // Get cart from localStorage and parse it
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Use a Set to store unique category names
    const uniqueCategories = new Set();

    cart.forEach((item) => {
      if (item.category) {
        uniqueCategories.add(item.category);
      }
    });

    // Convert Set to array of objects with 'category' key
    return Array.from(uniqueCategories).map((category) => ({ category }));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, totalQuantity, getCartCategories, clearCart }}
    >
      {children}
      {showModal && (
        <CartDiffVendorWarningModal
          heading={modalContent.heading}
          message={modalContent.message}
          onClose={closeModal}
          onClearCart={clearCart}
        />
      )}
    </CartContext.Provider>
  );
};

export const useUniqueCategories = () => {
  const context = useCart();
  return context.getCartCategories();
};
