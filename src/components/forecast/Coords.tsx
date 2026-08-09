import { type FC, useEffect } from "react";
import Forcast from "@/components/forecast/Forecast";
import { ForecastSkeleton } from "@/components/Loader";
import { useToast } from "@/context/toast/ToastContext";
import { ForecastNotFound } from "@/components/NotFound";
import { useForecastByCoordinates } from "@/hooks/forecastQuery";
import type { GeolocationType } from "@/context/geolocation/GeolocationContext";

const ForecastCoords: FC<Exclude<Exclude<GeolocationType, null>, undefined>> = (coords) => {
  const { isFetching, data, error, isError } = useForecastByCoordinates(coords);
  const toast = useToast();
  useEffect(() => {
    if (error) toast.open(error.message, "alert-error");
  }, [isError]);
  return (
    <>
      {isFetching ? (<ForecastSkeleton />) : ((data) ? (<Forcast {...data} />) : (<ForecastNotFound />))}
    </>
  )
};
export default ForecastCoords;