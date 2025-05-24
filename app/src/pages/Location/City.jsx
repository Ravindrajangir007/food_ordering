import React from "react";
import { useParams } from "react-router-dom";

const City = () => {
  const { state, city } = useParams();
  return (
    <div>
      {state}, {city}
    </div>
  );
};

export default City;
