import { z } from "zod";
import { type FC, useEffect } from "react";
import { placeSchema } from "@/validators/query";
import Weather from "@/components/weather/Weather";
import { WeatherSkeleton } from "@/components/Loader";
import { WeatherNotFound } from "@/components/NotFound";
import { useToast } from "@/context/toast/ToastContext";
import { useWeatherByCity } from "@/hooks/weatherQuery";

const WeatherCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const { isLoading, data, isError, error } = useWeatherByCity(q);
  const toast = useToast();
  useEffect(() => {
    if (isError) toast.open(error.message, "alert-error");
  }, [isError]);
  return (
    <>
      {isLoading ? (<WeatherSkeleton />) : ((data) ? (<Weather {...data} />) : (<WeatherNotFound />))}
    </>
  )
};
export default WeatherCity;