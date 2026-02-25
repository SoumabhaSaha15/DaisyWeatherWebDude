import { type FC } from "react";
import Forcast from "./Forecast";
import { ForecastSkeleton } from "../Loader";
import { ForecastNotFound } from "../NotFound";
import { useToast } from "../../context/toast/ToastContext";
import { useForecastByCoordinates } from "../../hooks/forecastQuery";
import type { GeolocationType } from "../../context/geolocation/GeolocationContext";

const ForecastCoords: FC<Exclude<Exclude<GeolocationType, null>, undefined>> = (coords) => {
  const toast = useToast();
  const { isFetching, data } = useForecastByCoordinates(coords, (error) => toast.open(error.message));
  return (
    <>
      {isFetching ? (<ForecastSkeleton />) : ((data) ? (<Forcast {...data} />) : (<ForecastNotFound />))}
    </>
  )
};
export default ForecastCoords;