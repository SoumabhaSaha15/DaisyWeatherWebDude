
import base from "../utility/AxiosBase";
import { type AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { type GeolocationType } from "../context/geolocation/GeolocationContext";
import { placeQuerySchema, coordQuerySchema, coordSchema } from "./../validators/query";
import { type ForecastResponse, forecastResponseSchema } from "./../validators/forecast";
/**
 * @name fetchWeatherByPlaceName takes placeName as input and fetches weather data from OpenWeather API
 * @throws {ZodError | AxiosError}
 * @returns {Promise<ForecastResponse>}
 */
export const fetchForecastByPlaceName = async (placeName: string): Promise<ForecastResponse> => {
  const response: AxiosResponse<ForecastResponse> = await base
    .get<ForecastResponse>(
      import.meta.env.VITE_OW_FORECAST,
      {
        params: placeQuerySchema.parse({ q: placeName }),
        schema: forecastResponseSchema
      }
    );
  return response.data;
};
/**
 * @name fetchWeatherByCoordinates takes coordinates as input and fetches weather data from OpenWeather API
 * @throws {ZodError | AxiosError}
 * @returns {Promise<ForecastResponse>}
 */
export const fetchForecastByCoordinates = async (coords: Exclude<Exclude<GeolocationType, null>, undefined>): Promise<ForecastResponse> => {
  const response: AxiosResponse<ForecastResponse> = await base
    .get<ForecastResponse>(
      import.meta.env.VITE_OW_FORECAST,
      {
        params: coordQuerySchema.parse(coords),
        schema: forecastResponseSchema
      }
    );
  return response.data;
};


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