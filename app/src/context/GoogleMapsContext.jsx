import React, { createContext, useContext } from "react";
import { LoadScript } from "@react-google-maps/api";
import { GOOGLE_API } from "../config";

const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API}>
      <GoogleMapsContext.Provider value={{}}>
        {children}
      </GoogleMapsContext.Provider>
    </LoadScript>
  );
};

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};
