import { useToast } from "../toast/ToastContext";
import { coordSchema } from "../../validators/query";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { GeolocationContext, type GeolocationType } from "./GeolocationContext";

const GeolocationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const toast = useToast();
  const [geolocation, setGeolocation] = useState<GeolocationType>(undefined);
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        const points = coordSchema.parse({
          lat: latitude,
          lon: longitude
        });
        setGeolocation({
          lon: Number.parseFloat(points.lon),
          lat: Number.parseFloat(points.lat)
        });
      },
      (err: GeolocationPositionError) => {
        toast.open(err.message, "alert-error");
        setGeolocation(null);
      }, { enableHighAccuracy: true }
    );
  }, []);
  return (
    <GeolocationContext.Provider value={{ geolocation }}>
      {children}
    </GeolocationContext.Provider>
  );
}
export default GeolocationProvider;