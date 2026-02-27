import { z } from "zod"
import Forcast from "./Forecast";
import { type FC, useEffect } from "react";
import { ForecastSkeleton } from "../Loader";
import { ForecastNotFound } from "../NotFound";
import { placeSchema } from "../../validators/query";
import { useToast } from "../../context/toast/ToastContext";
import { useForecastByCity } from "../../hooks/forecastQuery";

const ForecastCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const { isLoading, data, error, isError } = useForecastByCity(q);
  const toast = useToast();
  useEffect(() => {
    if (isError) toast.open(error.message);
  }, [isError]);
  return (
    <>
      {isLoading ? (<ForecastSkeleton />) : ((data) ? (<Forcast {...data} />) : (<ForecastNotFound />))}
    </>
  )
};
export default ForecastCity;