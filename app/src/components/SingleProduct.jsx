import React from "react";
import config, { NonVegMark, VegMark } from "../config";
import { FaRegBookmark } from "react-icons/fa";
import AddToCart from "../comon/AddToCart";
import { useCart } from "../context/CartContext";
import RatingDisplay from "../comon/RatingDisplay";

const SingleProduct = ({ item, isDelivered }) => {
  const { addToCart, cart } = useCart();

  const cartItem = cart.find((cartItem) => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div
      className={`flex-shrink-0 bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden`}
    >
      <div>
        <div className="relative">
          <img
            src={config.IMAGE_URL + item.mainImage}
            alt={item.name}
            className="w-full h-44 object-cover"
          />
          <p className="text-[11px] text-black font-medium absolute bg-white -bottom-3 left-0 w-1/2 px-2 py-1 rounded-tr-[80px]">
            {item.vendor}
          </p>
          {/* <span className="bg-yellow-500/70 text-white text-xs px-3 py-0.5 rounded-md font-medium absolute top-2 right-2 text-center">
            Trending
          </span> */}
          <div className="absolute top-2 px-2 w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              {item.isVeg == 1 ? <VegMark /> : <NonVegMark />}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <button className="flex items-center text-gray-500 hover:text-gray-800 bg-sky-50 rounded-full p-2 cursor-pointer">
                <FaRegBookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-3 pb-0 space-y-1">
          <h3 className="font-semibold text-md text-gray-800 poppins-medium">
            {item.name}
          </h3>

          <RatingDisplay
            averageRating={item.avg_rating}
            totalRatings={item.total_rating}
          />
          <p className="text-xs poppins-light">{item.description}</p>
        </div>

        <div className="p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-800 text-sm poppins-medium">
              {config.CURRENCY + item.price}
            </span>
            {isDelivered === "yes" ? (
              item.inStock === "yes" ? (
                <AddToCart
                  item={item}
                  quantity={quantity}
                  onAddToCart={addToCart}
                  onRemoveFromCart={() => addToCart({ ...item, quantity: -1 })}
                />
              ) : (
                <p className="text-xs py-2">Out of stock</p>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
