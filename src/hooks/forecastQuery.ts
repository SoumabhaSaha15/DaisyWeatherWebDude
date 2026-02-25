
import base from "../utility/AxiosBase";
import { useQuery } from "@tanstack/react-query";
import { type GeolocationType } from "../context/geolocation/GeolocationContext";
import { placeQuerySchema, coordQuerySchema, coordSchema } from "./../validators/query";
import { type ForecastResponse, forecastResponseSchema } from "./../validators/forecast";
// import { error } from "node:console";

const fetchForecastByPlaceName = async (placeName: string): Promise<ForecastResponse> => (await base.get<ForecastResponse>(import.meta.env.VITE_OW_FORECAST, { params: placeQuerySchema.parse({ q: placeName }), schema: forecastResponseSchema })).data;

const fetchForecastByCoordinates = async (coords: Exclude<Exclude<GeolocationType, null>, undefined>): Promise<ForecastResponse> => (await base.get<ForecastResponse>(import.meta.env.VITE_OW_FORECAST, { params: coordQuerySchema.parse(coords), schema: forecastResponseSchema })).data;

export const useForecastByCity = (city: string, onError: (error: Error) => void = console.error) => {
  return useQuery({
    queryKey: ['forecast', 'city', city.toLowerCase()],
    queryFn: () => fetchForecastByPlaceName(city),
    enabled: !!city,             // Don't fetch if city is empty
    staleTime: 1000 * 60 * 10,   // Data is fresh for 10 minutes
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours (offline support)
    retry: 1,                    // Retry once if API fails
    throwOnError: (error) => {
      onError(error);
      return false;
    },           // Throw error to be caught by react-query's error handling
  });
};

export const useForecastByCoordinates = (coords: Exclude<Exclude<GeolocationType, null>, undefined>, onError: (error: Error) => void = console.error) => {
  return useQuery({
    queryKey: ['forecast', 'coords', coords.lon, coords.lat],
    queryFn: () => fetchForecastByCoordinates(coords),
    enabled: coordSchema.safeParse(coords).success,
    staleTime: 1000 * 60 * 10,   // Data is fresh for 10 minutes
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours (offline support)
    retry: 1,                    // Retry once if API fails
    throwOnError: (error) => {
      onError(error);
      return false;
    }
  });
};