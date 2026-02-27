import Forcast from "./Forecast";
import { type FC, useEffect } from "react";
import { ForecastSkeleton } from "../Loader";
import { ForecastNotFound } from "../NotFound";
import { useToast } from "../../context/toast/ToastContext";
import { useForecastByCoordinates } from "../../hooks/forecastQuery";
import type { GeolocationType } from "../../context/geolocation/GeolocationContext";

const ForecastCoords: FC<Exclude<Exclude<GeolocationType, null>, undefined>> = (coords) => {
  const { isFetching, data, error, isError } = useForecastByCoordinates(coords);
  const toast = useToast();
  useEffect(() => {
    if (error) toast.open(error.message);
  }, [isError]);
  return (
    <>
      {isFetching ? (<ForecastSkeleton />) : ((data) ? (<Forcast {...data} />) : (<ForecastNotFound />))}
    </>
  )
};
export default ForecastCoords;