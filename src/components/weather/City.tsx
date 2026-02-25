import { z } from "zod";
import { type FC } from "react";
import Weather from "./Weather";
import { WeatherSkeleton } from "../Loader";
import { WeatherNotFound } from "../NotFound";
import { placeSchema } from "../../validators/query";
import { useToast } from "../../context/toast/ToastContext";
import { useWeatherByCity } from "../../hooks/weatherQuery";

const WeatherCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const toast = useToast();
  const { isLoading, data } = useWeatherByCity(q, (error) => toast.open(error.message));
  return (
    <>
      {isLoading ? (<WeatherSkeleton />) : ((data) ? (<Weather {...data} />) : (<WeatherNotFound />))}
    </>
  )
};
export default WeatherCity;