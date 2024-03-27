"use client";
import { createContext, useContext, useState } from "react";

type LocationContextValue = {
  userLocation: LocationValue;
  updateUserLocation: ({ lat, lng }: { lat: number; lng: number }) => void;
};

export type LocationValue = {
  lat: number;
  lng: number;
};

const initialValue: LocationContextValue = {
  userLocation: {
    lat: 33.450701,
    lng: 126.570667,
  },
  updateUserLocation: () => {},
};
const locationContext = createContext(initialValue);

export const useLocation = () => useContext(locationContext);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [userLocation, setUserLocation] = useState(initialValue.userLocation);

  const updateUserLocation = ({ lat, lng }: { lat: number; lng: number }) => {
    setUserLocation({ lat, lng });
  };

  const value: LocationContextValue = {
    userLocation,
    updateUserLocation,
  };

  return (
    <locationContext.Provider value={value}>
      {children}
    </locationContext.Provider>
  );
}
