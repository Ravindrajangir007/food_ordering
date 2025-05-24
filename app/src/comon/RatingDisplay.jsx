import React from "react";
import { FaStar } from "react-icons/fa";

const RatingDisplay = ({ averageRating, totalRatings, maxPoints = 10000 }) => {
  // Convert points to 5-star scale if averageRating > 5
  const rating =
    averageRating > 5 ? (averageRating / maxPoints) * 5 : averageRating;

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span
          key={i}
          className={i <= filledStars ? "text-yellow-500" : "text-gray-300"}
        >
          <FaStar className="w-3 h-3" />
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-0.5">
      <div className="flex items-center gap-0.5">{renderStars(rating)}</div>
      <span className="text-xs text-gray-500">({totalRatings})</span>
    </div>
  );
};

export default RatingDisplay;
