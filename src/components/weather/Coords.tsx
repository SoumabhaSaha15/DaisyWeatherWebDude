import { type FC } from "react";
import Weather from "./Weather";
import { WeatherSkeleton } from "../Loader";
import { WeatherNotFound } from "../NotFound";
import { useToast } from "../../context/toast/ToastContext";
import { useWeatherByCoords } from "../../hooks/weatherQuery";
import type { GeolocationType } from "../../context/geolocation/GeolocationContext";

const WeatherCoords: FC<Exclude<Exclude<GeolocationType, null>, undefined>> = (coords) => {
  const toast = useToast();
  const { isLoading, data } = useWeatherByCoords(coords, (error) => toast.open(error.message));
  return (
    <>
      {isLoading ? (<WeatherSkeleton />) : ((data) ? (<Weather {...data} />) : (<WeatherNotFound />))}
    </>
  )
};
export default WeatherCoords;