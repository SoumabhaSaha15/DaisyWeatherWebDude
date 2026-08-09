
import base from "@/utility/base";
import { useQuery } from "@tanstack/react-query";
import { type GeolocationType } from "@/context/geolocation/GeolocationContext";
import { placeQuerySchema, coordQuerySchema, coordSchema } from "@/validators/query";
import { type ForecastResponse, forecastResponseSchema } from "@/validators/forecast";
// import { error } from "node:console";

const fetchForecastByPlaceName = async (placeName: string): Promise<ForecastResponse> => (await base.get<ForecastResponse>(import.meta.env.VITE_OW_FORECAST, { params: placeQuerySchema.parse({ q: placeName }), schema: forecastResponseSchema })).data;

const fetchForecastByCoordinates = async (coords: Exclude<Exclude<GeolocationType, null>, undefined>): Promise<ForecastResponse> => (await base.get<ForecastResponse>(import.meta.env.VITE_OW_FORECAST, { params: coordQuerySchema.parse(coords), schema: forecastResponseSchema })).data;

export const useForecastByCity = (city: string) => {
  return useQuery({
    queryKey: ['forecast', 'city', city.toLowerCase()],
    queryFn: () => fetchForecastByPlaceName(city),
    enabled: !!city,             // Don't fetch if city is empty
    staleTime: 1000 * 60 * 10,   // Data is fresh for 10 minutes
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours (offline support)
    retry: 1,                    // Retry once if API fails
  });
};

export const useForecastByCoordinates = (coords: Exclude<Exclude<GeolocationType, null>, undefined>) => {
  return useQuery({
    queryKey: ['forecast', 'coords', coords.lon, coords.lat],
    queryFn: () => fetchForecastByCoordinates(coords),
    enabled: coordSchema.safeParse(coords).success,
    staleTime: 1000 * 60 * 10,   // Data is fresh for 10 minutes
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours (offline support)
    retry: 1,                    // Retry once if API fails
  });
};