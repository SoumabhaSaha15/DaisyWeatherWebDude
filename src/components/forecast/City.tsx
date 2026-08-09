import { z } from "zod"
import { type FC, useEffect } from "react";
import { placeSchema } from "@/validators/query";
import Forcast from "@/components/forecast/Forecast";
import { ForecastSkeleton } from "@/components/Loader";
import { useToast } from "@/context/toast/ToastContext";
import { ForecastNotFound } from "@/components/NotFound";
import { useForecastByCity } from "@/hooks/forecastQuery";

const ForecastCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const { isLoading, data, error, isError } = useForecastByCity(q);
  const toast = useToast();
  useEffect(() => {
    if (isError) toast.open(error.message, "alert-error");
  }, [isError]);
  return (
    <>
      {isLoading ? (<ForecastSkeleton />) : ((data) ? (<Forcast {...data} />) : (<ForecastNotFound />))}
    </>
  )
};
export default ForecastCity;