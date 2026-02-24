import { type FC } from "react";
import { type WeatherResponse } from "../../validators/weather";
import {
  WiStrongWind,
  WiHumidity,
  WiSunrise,
  WiSunset
} from "react-icons/wi";


// Helper for Bars (Pressure/Visibility)
const RenderBars: FC<{ value: number; max: number; colorClass: string }> = ({ value, max, colorClass }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const totalBars = 8;
  const filledBars = Math.ceil((percentage / 100) * totalBars);

  return (
    <div className="flex flex-col gap-1.5 h-full justify-end">
      {Array.from({ length: totalBars }).map((_, i) => (
        <div
          key={crypto.randomUUID()}
          className={`w-8 sm:w-10 h-1.5 rounded-full transition-colors duration-500 ${(totalBars - 1 - i) < filledBars ? colorClass : "bg-base-content/10"}`}
        />
      ))}
    </div>
  );
};

const Weather: FC<WeatherResponse> = (weather) => {
  // Sun Cycle Calc
  const currentTime = Date.now() / 1000;
  const sunProgress = Math.max(0, Math.min(1,
    (currentTime - weather.sys.sunrise) / (weather.sys.sunset - weather.sys.sunrise)
  ));
  const arcLength = 252;
  const strokeDashoffset = arcLength - (arcLength * sunProgress);

  return (
    // ADDED: Grid Wrapper to force layout & gaps
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 w-full p-3">

      {/* 1. TIME & DATE */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 scale-95 hover:scale-100 animate-wiggle">
        <div className="card-body relative overflow-hidden p-6">
          <div className="flex justify-between items-start z-10">
            <div className="badge badge-primary badge-soft hover:badge-outline gap-2 font-bold">Today {`${weather.name}, ${weather.sys.country}`}</div>
            <img
              src={weather.weather[0].icon}
              alt={weather.weather[0].description}
              className="w-16 h-16 -mt-4 filter drop-shadow-lg"
            />
          </div>
          <div className="mt-auto z-10">
            <div className="text-5xl xl:text-6xl font-light tracking-tighter text-base-content">
              {new Date(weather.dt * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })}
            </div>
            <div className="text-sm font-medium opacity-60 mt-2 uppercase tracking-wide">
              {new Date(weather.dt * 1000).toLocaleDateString("en-IN", { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* 2. WIND GAUGE */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 scale-95 hover:scale-100 animate-wiggle">
        <div className="card-body items-center relative p-4">
          <div className="w-full flex justify-between items-center mb-1">
            <h2 className="text-xs font-bold opacity-60 uppercase tracking-widest flex gap-2 items-center">
              <WiStrongWind className="text-3xl" /> Wind
            </h2>
          </div>

          <div className="relative w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {Array.from({ length: 40 }).map((_, i) => (
                <line
                  key={crypto.randomUUID()}
                  x1="50" y1="10" x2="50" y2="15"
                  transform={`rotate(${i * 9} 50 50)`}
                  className={i % 10 === 0 ? "stroke-base-content" : "stroke-base-content/20"}
                  strokeWidth={i % 10 === 0 ? "2" : "1"}
                />
              ))}
              <text x="50" y="8" textAnchor="middle" className="text-[8px] fill-base-content font-bold">N</text>
              <text x="92" y="52" textAnchor="middle" className="text-[8px] fill-base-content font-bold">E</text>
              <text x="50" y="96" textAnchor="middle" className="text-[8px] fill-base-content font-bold">S</text>
              <text x="8" y="52" textAnchor="middle" className="text-[8px] fill-base-content font-bold">W</text>
              <g transform={`rotate(${weather.wind.deg} 50 50)`} className="transition-transform duration-1000 ease-out">
                <line x1="50" y1="50" x2="50" y2="20" className="stroke-accent" strokeWidth="3" strokeLinecap="round" />
                <circle cx="50" cy="50" r="3" className="fill-accent" />
              </g>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-2xl font-bold text-shadow-2xl">{Math.round(weather.wind.speed)}</span>
              <span className="text-[12px] opacity-60">KMPH</span>
            </div>
          </div>
          <div className="flex justify-between w-full text-[12px] opacity-50 px-2">
            <span>Gust: {weather.wind.gust ?? 0}</span>
            <span>{weather.wind.deg}°</span>
          </div>
        </div>
      </div>

      {/* 3. VISIBILITY & PRESSURE */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 md:row-span-2 scale-95 hover:scale-100 animate-wiggle">
        <div className="card-body p-5">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-bold opacity-60 uppercase tracking-widest">Visibility</h2>
          </div>
          <div className="flex justify-between items-end flex-1">
            <RenderBars value={weather.visibility} max={10000} colorClass="bg-info" />
            <div className="text-right pb-2">
              <div className="text-4xl font-bold tracking-tighter">{Math.round(weather.visibility / 1000)}</div>
              <div className="text-xs opacity-60 font-bold">KM</div>
              <div className="text-[12px] opacity-40 mt-1">Max 10km</div>
            </div>
          </div>
          <div className="divider divider-accent"></div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-bold opacity-60 uppercase tracking-widest">Pressure</h2>
          </div>
          <div className="flex justify-between items-end flex-1">
            <RenderBars value={weather.main.pressure} max={1050} colorClass="bg-warning" />
            <div className="text-right pb-2">
              <div className="text-4xl font-bold tracking-tighter">{weather.main.pressure}</div>
              <div className="text-xs opacity-60 font-bold">hPa</div>
              <div className="text-[12px] opacity-40 mt-1">Normal 1013</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TEMPERATURE */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 scale-95 hover:scale-100 animate-wiggle">
        <div className="card-body justify-between p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xs font-bold opacity-60 uppercase tracking-widest">Temperature</h2>
            <div className="badge badge-soft hover:badge-outline badge-md font-mono opacity-70">{weather.weather[0].main}</div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div>
              <span className="text-6xl font-thin tracking-tighter">{Math.round(weather.main.temp)}°</span>
            </div>
            <div className="text-right space-y-1">
              <div className="text-xs">
                <span className="opacity-60">Feels </span>
                <span className="font-bold">{Math.round(weather.main.feels_like)}°</span>
              </div>
              <div className="text-xs">
                <span className="opacity-60">High </span>
                <span className="font-bold text-error">{Math.round(weather.main.temp_max)}°</span>
              </div>
              <div className="text-xs">
                <span className="opacity-60">Low </span>
                <span className="font-bold text-info">{Math.round(weather.main.temp_min)}°</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. HUMIDITY */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 scale-95 hover:scale-100 animate-wiggle">
        <div className="card-body items-center justify-center relative p-4">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <WiHumidity className="text-3xl" />
            <span className="text-xs font-bold opacity-60 uppercase tracking-widest">Humidity</span>
          </div>
          <div className="mt-6 relative flex items-center justify-center">
            <div className="radial-progress text-base-content/5" style={{ "--value": 100, "--size": "8rem", "--thickness": "0.8rem" } as any}></div>
            <div className="radial-progress text-info absolute" style={{ "--value": weather.main.humidity, "--size": "8rem", "--thickness": "0.8rem" } as any}>
              <span className="text-3xl font-bold text-base-content">{weather.main.humidity}%</span>
            </div>
          </div>
          <div className="text-xs opacity-50 mt-1">Dew Point: {Math.round(weather.main.temp - ((100 - weather.main.humidity) / 5))}°</div>
        </div>
      </div>

      {/* 6. SUN/MOON */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 scale-95 hover:scale-100 animate-wiggle">
        <div className="card-body relative overflow-hidden p-5">
          <h2 className="text-xs font-bold opacity-60 uppercase tracking-widest z-10 flex justify-between">
            <span>Sun Cycle</span>
            <span className="text-[12px] opacity-60 font-mono">{sunProgress < 1 && sunProgress > 0 ? "DAYTIME" : "NIGHT"}</span>
          </h2>
          <div className="flex-1 flex items-center justify-center z-10 mt-4 relative">
            <svg viewBox="0 0 200 100" className="w-full h-24 overflow-visible">
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" className="stroke-base-content/10" strokeWidth="4" strokeDasharray="5,5" />
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                className="stroke-warning transition-all duration-1000"
                strokeWidth="4"
                strokeDasharray="252"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-xs font-bold opacity-80">
                {new Date().toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[12px] font-bold opacity-50 mt-auto pt-2 border-t border-base-content/5">
            <div className="flex items-center gap-1"><WiSunrise className="text-2xl" /> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="flex items-center gap-1"><WiSunset className="text-2xl" /> {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;