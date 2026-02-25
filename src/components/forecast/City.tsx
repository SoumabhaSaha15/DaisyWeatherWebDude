import { z } from "zod"
import { type FC } from "react";
import Forcast from "./Forecast";
import { ForecastSkeleton } from "../Loader";
import { ForecastNotFound } from "../NotFound";
import { placeSchema } from "../../validators/query";
import { useToast } from "../../context/toast/ToastContext";
import { useForecastByCity } from "../../hooks/forecastQuery";

const ForecastCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const toast = useToast();
  const { isLoading, data } = useForecastByCity(q, (error) => toast.open(error.message));
  return (
    <>
      {isLoading ? (<ForecastSkeleton />) : ((data) ? (<Forcast {...data} />) : (<ForecastNotFound />))}
    </>
  )
};
export default ForecastCity;