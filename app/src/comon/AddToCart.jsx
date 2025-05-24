import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddToCart = ({
  item,
  quantity,
  onAddToCart,
  onRemoveFromCart,
  width,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(item);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Reset animation after 1 second
  };
  const handleRemoveToCart = () => {
    onRemoveFromCart(item);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Reset animation after 1 second
  };

  return (
    <div className="flex items-center relative">
      {quantity === 0 ? (
        <motion.button
          onClick={handleAddToCart}
          className={`bg-yellow-500 text-white px-4 py-1.5 rounded-xl text-sm poppins-medium ${
            width ? width : "w-[100px]"
          } text-center cursor-pointer h-10`}
          whileTap={{
            backgroundColor: "#f7f7f7",
            borderRadius: "100px",
            scale: 0.95,
          }}
        >
          Add +
        </motion.button>
      ) : (
        <motion.div
          className={`flex justify-around items-center bg-yellow-50 border border-yellow-500 text-yellow-500 rounded-xl poppins-medium ${
            width ? width : "w-[100px]"
          }  h-10`}
        >
          <motion.button
            onClick={handleRemoveToCart}
            whileTap={{
              backgroundColor: "#f7f7f7",
              borderRadius: "100px",
              scale: 0.95,
            }}
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <FaMinus className="w-3 h-3" />
          </motion.button>
          <span className="w-6 text-center text-yellow-500">{quantity}</span>
          <motion.button
            onClick={handleAddToCart}
            whileTap={{
              backgroundColor: "#f7f7f7",
              borderRadius: "100px",
              scale: 0.95,
            }}
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <FaPlus className="w-3 h-3" />
          </motion.button>
        </motion.div>
      )}
      {isAnimating && (
        <motion.div
          className="absolute bottom-0 left-2 h-1 bg-yellow-400 rounded-3xl"
          initial={{ width: 0 }}
          animate={{ width: width ? "96%" : "84%" }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
};

export default AddToCart;
