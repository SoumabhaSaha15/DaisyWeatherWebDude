import { type FC } from "react";
import { DateGrouper } from "@/utility/DateGrouper";
import { type ForecastResponse } from "@/validators/forecast";
import { WiRain, WiDaySunny, WiCloudy, WiSnow, WiThunderstorm } from "react-icons/wi";

const Forecast: FC<ForecastResponse> = (forecast) => {
  const dailyForecasts = DateGrouper(forecast.list);

  // Helper to get icon based on weather condition
  const getIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "rain": return <WiRain className="text-3xl text-info" />;
      case "clear": return <WiDaySunny className="text-3xl text-warning" />;
      case "clouds": return <WiCloudy className="text-3xl text-base-content/70" />;
      case "snow": return <WiSnow className="text-3xl text-info" />;
      case "thunderstorm": return <WiThunderstorm className="text-3xl text-warning" />;
      default: return <WiDaySunny className="text-3xl text-base-content" />;
    }
  };

  return (
    // SPAN 2 ROWS to accommodate the list height naturally in the grid
    <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 md:row-span-2 m-4  animate-wiggle">
      <div className="card-body p-5 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xs font-bold opacity-60 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent"></span> 5-Day Forecast
          </h2>
          <div className="badge badge-md text-accent font-bold badge-ghost opacity-50">{forecast.city.name}</div>
        </div>

        {/* Forecast List */}
        <div className="flex flex-col gap-1 overflow-y-auto pr-1 custom-scrollbar h-full">
          {dailyForecasts.map((day, index) => {
            // Get the "middle" forecast of the day (noon-ish) for representative icon/temp
            const rep = day.data[Math.floor(day.data.length / 2)] || day.data[0];
            const maxTemp = Math.max(...day.data.map(d => d.main.temp_max));
            const minTemp = Math.min(...day.data.map(d => d.main.temp_min));
            const dayName = new Date(day.dailyDate).toLocaleDateString("en-IN", { weekday: 'short' });

            return (
              <div
                key={crypto.randomUUID()}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-base-content/5 transition-colors group cursor-default"
              >
                {/* Day & Date */}
                <div className="w-12 flex flex-col items-center">
                  <span className="font-bold text-sm">{index === 0 ? "Today" : dayName}</span>
                </div>

                {/* Icon & Condition */}
                <div className="flex flex-col items-center w-10">
                  {getIcon(rep.weather[0].main)}
                </div>

                {/* Probabilities (Rain/Wind) */}
                <div className="text-[12px] opacity-40 font-mono flex flex-col gap-0.5 w-16 text-center">
                  <span>{Math.round(rep.pop * 100)}% Rain</span>
                </div>

                {/* Temp Bars */}
                <div className="flex items-center gap-2 text-xs font-medium w-24 justify-end">
                  <span className="opacity-50">{Math.round(minTemp)}°</span>
                  {/* Visual Temp Bar */}
                  <div className="w-12 h-1.5 bg-base-content/10 rounded-full relative overflow-hidden">
                    <div
                      className="absolute h-full bg-linear-to-r from-info to-warning rounded-full"
                      style={{
                        left: '10%', // Simplified positioning
                        right: '10%'
                      }}
                    ></div>
                  </div>
                  <span className="font-bold">{Math.round(maxTemp)}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Forecast;