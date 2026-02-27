import Weather from "./Weather";
import { useEffect, type FC } from "react";
import { WeatherSkeleton } from "../Loader";
import { WeatherNotFound } from "../NotFound";
import { useToast } from "../../context/toast/ToastContext";
import { useWeatherByCoords } from "../../hooks/weatherQuery";
import type { GeolocationType } from "../../context/geolocation/GeolocationContext";

const WeatherCoords: FC<Exclude<Exclude<GeolocationType, null>, undefined>> = (coords) => {
  const { isLoading, data, error, isError } = useWeatherByCoords(coords);
  const toast = useToast();
  useEffect(() => {
    if (isError) toast.open(error.message);
  }, [isError]);
  return (
    <>
      {isLoading ? (<WeatherSkeleton />) : ((data) ? (<Weather {...data} />) : (<WeatherNotFound />))}
    </>
  )
};
export default WeatherCoords;