import { useEffect, type FC } from "react";
import Weather from "@/components/weather/Weather";
import { WeatherSkeleton } from "@/components/Loader";
import { WeatherNotFound } from "@/components/NotFound";
import { useToast } from "@/context/toast/ToastContext";
import { useWeatherByCoords } from "@/hooks/weatherQuery";
import type { GeolocationType } from "@/context/geolocation/GeolocationContext";
import { prettifyError, ZodError } from "zod";

const WeatherCoords: FC<Exclude<Exclude<GeolocationType, null>, undefined>> = (coords) => {
  const { isLoading, data, error, isError } = useWeatherByCoords(coords);
  const toast = useToast({ horizontal: "toast-center", vertical: "toast-bottom" });
  useEffect(() => {
    if (isError) {
      const msg = (error instanceof ZodError) ? (prettifyError(error)) : (error.message);
      toast.open(msg, "alert-error");
    };
  }, [isError]);
  return (
    <>
      {isLoading ? (<WeatherSkeleton />) : ((data) ? (<Weather {...data} />) : (<WeatherNotFound />))}
    </>
  )
};
export default WeatherCoords;