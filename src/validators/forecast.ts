import z from 'zod';

export const forecastResponseSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(z.object({
    dt: z.number(),
    main: z.object({
      temp: z.number(),
      feels_like: z.number(),
      temp_min: z.number(),
      temp_max: z.number(),
      pressure: z.number(),
      sea_level: z.number(),
      grnd_level: z.number(),
      humidity: z.number(),
      temp_kf: z.number(),
    }),
    weather: z.array(z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string().transform(icon => `https://openweathermap.org/img/wn/${icon}@2x.png`),
    })),
    clouds: z.object({
      all: z.number(),
    }),
    wind: z.object({
      speed: z.number(),
      deg: z.number(),
      gust: z.number(),
    }),
    visibility: z.number().optional(),
    pop: z.number(),
    rain: z.object({
      "1h": z.number().optional(),
      "3h": z.number().optional(),
    }).optional(),
    snow: z.object({
      "1h": z.number().optional(),
      "3h": z.number().optional(),
    }).optional(),
    sys: z.object({
      pod: z.string(),
    }),
    dt_txt: z.string(),
  })),
  city: z.object({
    id: z.number(),
    name: z.string(),
    coord: z.object({
      lat: z.number(),
      lon: z.number(),
    }),
    country: z.string(),
    population: z.number(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});

export type ForecastResponse = z.infer<typeof forecastResponseSchema>;