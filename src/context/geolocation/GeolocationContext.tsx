import { createContext, type Context, useContext } from "react";
export type GeolocationType = { lon: number; lat: number; } | null | undefined;
type GeolocationProp = {
  geolocation: GeolocationType;
};

export const GeolocationContext: Context<GeolocationProp> = createContext<GeolocationProp>({
  geolocation: undefined,
});

const useGeolocation = () => useContext<GeolocationProp>(GeolocationContext);

export default useGeolocation;