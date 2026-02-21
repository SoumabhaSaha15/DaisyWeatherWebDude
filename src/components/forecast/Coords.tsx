import Forcast from "./Forecast";
import { useEffect, type FC } from "react";
import { ForecastSkeleton } from "../Loader";
import { ForecastNotFound } from "../NotFound";
import { useForecastByCoordinates } from "../../hooks/forecastQuery";
import type { GeolocationType } from "../../context/geolocation/GeolocationContext";
import { useToast } from "../../context/toast/ToastContext";

const ForecastCoords: FC<Exclude<Exclude<GeolocationType, null>, undefined>> = (coords) => {
  const { isFetching, data, error } = useForecastByCoordinates(coords);
  const toast = useToast();
  useEffect(() => {
    if (error) toast.open(error.message);
  }, [error]);
  return (
    <>
      {isFetching ? (<ForecastSkeleton />) : ((data) ? (<Forcast {...data} />) : (<ForecastNotFound />))}
    </>
  )
};
export default ForecastCoords;