import base from "../utility/AxiosBase";
import { type AxiosResponse } from "axios";
import { useQuery } from '@tanstack/react-query';
import { type GeolocationType } from "../context/geolocation/GeolocationContext";
import { type WeatherResponse, weatherResponseSchema } from "./../validators/weather";
import { placeQuerySchema, coordQuerySchema, coordSchema } from "./../validators/query";
/**
 * @name fetchWeatherByPlaceName takes placeName as input and fetches weather data from OpenWeather API
 * @throws {ZodError | AxiosError}
 * @returns {Promise<WeatherResponse>}
 */
export const fetchWeatherByPlaceName = async (placeName: string): Promise<WeatherResponse> => {
  const response: AxiosResponse<WeatherResponse> = await base
    .get<WeatherResponse>(
      import.meta.env.VITE_OW_WEATHER,
      {
        schema: weatherResponseSchema,
        params: placeQuerySchema.parse({ q: placeName })
      }
    );
  return weatherResponseSchema.parse(response.data);
};
/**
 * @name fetchWeatherByCoordinates takes coordinates as input and fetches weather data from OpenWeather API
 * @throws {ZodError | AxiosError}
 * @returns {Promise<WeatherResponse>}
 */
export const fetchWeatherByCoordinates = async (coords: Exclude<Exclude<GeolocationType, null>, undefined>): Promise<WeatherResponse> => {
  const response: AxiosResponse<WeatherResponse> = await base
    .get<WeatherResponse>(
      import.meta.env.VITE_OW_WEATHER,
      {
        schema: weatherResponseSchema,
        params: coordQuerySchema.parse(coords)
      }
    );
  return response.data;
};


export const useWeatherByCity = (city: string) => {
  return useQuery({
    queryKey: ['weather', 'city', city.toLowerCase()],
    queryFn: () => fetchWeatherByPlaceName(city),
    enabled: !!city,             // Don't fetch if city is empty
    staleTime: 1000 * 60 * 10,   // Data is fresh for 10 minutes
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours (offline support)
    retry: 1,                    // Retry once if API fails
  });
};

export const useWeatherByCoords = (coords: Exclude<Exclude<GeolocationType, null>, undefined>) => {
  return useQuery({
    queryKey: ['weather', 'coords', coords.lon, coords.lat],
    queryFn: () => fetchWeatherByCoordinates(coords),
    enabled: coordSchema.safeParse(coords).success,             // Don't fetch if city is empty
    staleTime: 1000 * 60 * 10,   // Data is fresh for 10 minutes
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours (offline support)
    retry: 1,                    // Retry once if API fails
  });
};