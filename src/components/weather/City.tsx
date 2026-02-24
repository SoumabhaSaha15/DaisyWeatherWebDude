import { z } from "zod";
import Weather from "./Weather";
import { useEffect, type FC } from "react";
import { WeatherSkeleton } from "../Loader";
import { WeatherNotFound } from "../NotFound";
import { placeSchema } from "../../validators/query";
import { useToast } from "../../context/toast/ToastContext";
import { useWeatherByCity } from "../../hooks/weatherQuery";

const WeatherCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const { isLoading, data, isError, error } = useWeatherByCity(q);
  const toast = useToast();
  useEffect(() => {
    if (isError) toast.open(error.message);
  }, [isError, error]);
  return (
    <>
      {isLoading ? (<WeatherSkeleton />) : ((data) ? (<Weather {...data} />) : (<WeatherNotFound />))}
    </>
  )
};
export default WeatherCity;