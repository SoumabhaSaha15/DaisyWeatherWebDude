import { type FC } from "react";

export const WeatherSkeleton: FC = () => {
  return (
    <>
      {/* 1. Time & Date */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 m-4">
        <div className="card-body p-6">
          <div className="flex justify-between">
            <div className="skeleton h-6 w-16 rounded-full opacity-50"></div>
            <div className="skeleton h-12 w-12 rounded-full opacity-50"></div>
          </div>
          <div className="mt-auto space-y-3">
            <div className="skeleton h-14 w-3/4 rounded-lg opacity-50"></div>
            <div className="skeleton h-4 w-1/2 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>

      {/* 2. Wind */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 m-4">
        <div className="card-body items-center p-4">
          <div className="w-full flex justify-between mb-4">
            <div className="skeleton h-4 w-16 rounded-full opacity-50"></div>
          </div>
          {/* Circle Gauge */}
          <div className="skeleton h-32 w-32 rounded-full opacity-50"></div>
          <div className="flex justify-between w-full mt-4 px-2">
            <div className="skeleton h-3 w-10 rounded-full opacity-30"></div>
            <div className="skeleton h-3 w-10 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>

      {/* 3. Vis & Pressure (Tall Card) */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 md:row-span-2  m-4">
        <div className="card-body p-5 flex flex-col justify-between">
          {/* Top half */}
          <div className="space-y-4">
            <div className="skeleton h-4 w-24 rounded-full opacity-50"></div>
            <div className="flex justify-between items-end">
              <div className="flex gap-1 h-12 items-end">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(_ => <div key={crypto.randomUUID()} className="skeleton w-2 h-full rounded-full opacity-30"></div>)}
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="skeleton h-8 w-16 rounded-lg opacity-50"></div>
                <div className="skeleton h-3 w-8 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>

          <div className="divider opacity-10"></div>

          {/* Bottom half */}
          <div className="space-y-4">
            <div className="skeleton h-4 w-24 rounded-full opacity-50"></div>
            <div className="flex justify-between items-end">
              <div className="flex gap-1 h-12 items-end">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(_ => <div key={crypto.randomUUID()} className="skeleton w-2 h-full rounded-full opacity-30"></div>)}
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="skeleton h-8 w-16 rounded-lg opacity-50"></div>
                <div className="skeleton h-3 w-8 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Temp */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1  m-4">
        <div className="card-body justify-between p-6">
          <div className="flex justify-between">
            <div className="skeleton h-4 w-24 rounded-full opacity-50"></div>
            <div className="skeleton h-6 w-16 rounded-full opacity-50"></div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div className="skeleton h-14 w-24 rounded-lg opacity-50"></div>
            <div className="space-y-2">
              <div className="skeleton h-3 w-16 rounded-full opacity-30"></div>
              <div className="skeleton h-3 w-16 rounded-full opacity-30"></div>
              <div className="skeleton h-3 w-16 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Humidity */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1  m-4">
        <div className="card-body items-center justify-center p-4 relative">
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="skeleton h-6 w-6 rounded-full opacity-50"></div>
            <div className="skeleton h-4 w-16 rounded-full opacity-50"></div>
          </div>
          <div className="skeleton h-32 w-32 rounded-full mt-6 opacity-50"></div>
          <div className="skeleton h-3 w-24 rounded-full mt-2 opacity-30"></div>
        </div>
      </div>

      {/* 6. Sun/Moon */}
      <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1  m-4">
        <div className="card-body p-5 flex flex-col justify-between">
          <div className="flex justify-between mb-2">
            <div className="skeleton h-4 w-20 rounded-full opacity-50"></div>
            <div className="skeleton h-3 w-12 rounded-full opacity-30"></div>
          </div>
          {/* Arc */}
          <div className="skeleton h-20 w-full rounded-t-full rounded-b-lg opacity-20 mt-2"></div>
          <div className="flex justify-between mt-auto pt-4">
            <div className="skeleton h-4 w-16 rounded-full opacity-50"></div>
            <div className="skeleton h-4 w-16 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ForecastSkeleton: FC = () => {
  return (
    <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 md:row-span-2 m-4">
      <div className="card-body p-5">
        <div className="flex justify-between items-center mb-6">
          <div className="skeleton h-5 w-32 rounded-full opacity-50"></div>
          <div className="skeleton h-6 w-20 rounded-full opacity-30"></div>
        </div>

        {/* 5-Day List Items */}
        <div className="flex flex-col gap-4 h-full overflow-hidden">
          {[1, 2, 3, 4, 5].map(_ => (
            <div key={crypto.randomUUID()} className="flex items-center justify-between p-2">
              {/* Day */}
              <div className="skeleton h-4 w-12 rounded-full opacity-50"></div>
              {/* Icon */}
              <div className="skeleton h-8 w-8 rounded-full opacity-50"></div>
              {/* Rain Prob */}
              <div className="skeleton h-3 w-12 rounded-full opacity-30"></div>
              {/* Temp Range */}
              <div className="skeleton h-4 w-24 rounded-full opacity-40"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// export default ForecastSkeleton;