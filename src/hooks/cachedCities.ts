import { useQueryClient } from '@tanstack/react-query';
import { type WeatherResponse } from '@/validators/weather';

export const useCachedCities = (max = 5) => {
  const queryClient = useQueryClient();

  return queryClient
    .getQueryCache()
    .findAll({
      queryKey: ['weather', 'city'],
      fetchStatus: 'idle',
    })
    .map((query) => {
      const data = query.state.data as WeatherResponse | undefined;
      return data?.name;
    })
    .filter((name): name is string => !!name)
    .reverse()
    .slice(0, max);
};