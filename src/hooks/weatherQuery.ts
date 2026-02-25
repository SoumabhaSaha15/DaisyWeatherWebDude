import base from "../utility/AxiosBase";
import { useQuery } from '@tanstack/react-query';
import { type GeolocationType } from "../context/geolocation/GeolocationContext";
import { type WeatherResponse, weatherResponseSchema } from "./../validators/weather";
import { placeQuerySchema, coordQuerySchema, coordSchema } from "./../validators/query";

const fetchWeatherByPlaceName = async (placeName: string): Promise<WeatherResponse> => (await base.get<WeatherResponse>(import.meta.env.VITE_OW_WEATHER, { schema: weatherResponseSchema, params: placeQuerySchema.parse({ q: placeName }) })).data;

const fetchWeatherByCoordinates = async (coords: Exclude<Exclude<GeolocationType, null>, undefined>): Promise<WeatherResponse> => (await base.get<WeatherResponse>(import.meta.env.VITE_OW_WEATHER, { schema: weatherResponseSchema, params: coordQuerySchema.parse(coords) })).data;


export const useWeatherByCity = (city: string, onError: (error: Error) => void = console.error) => {
  return useQuery({
    queryKey: ['weather', 'city', city.toLowerCase()],
    queryFn: () => fetchWeatherByPlaceName(city),
    enabled: !!city,             // Don't fetch if city is empty
    staleTime: 1000 * 60 * 10,   // Data is fresh for 10 minutes
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours (offline support)
    retry: 1,                    // Retry once if API fails
    throwOnError: (error) => {
      onError(error);
      return false;
    }
  });
};

export const useWeatherByCoords = (coords: Exclude<Exclude<GeolocationType, null>, undefined>, onError: (error: Error) => void = console.error) => {
  return useQuery({
    queryKey: ['weather', 'coords', coords.lon, coords.lat],
    queryFn: () => fetchWeatherByCoordinates(coords),
    enabled: coordSchema.safeParse(coords).success,             // Don't fetch if city is empty
    staleTime: 1000 * 60 * 10,   // Data is fresh for 10 minutes
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours (offline support)
    retry: 1,                    // Retry once if API fails
    throwOnError: (error) => {
      onError(error);
      return false;
    }
  });
};