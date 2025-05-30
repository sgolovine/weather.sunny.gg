import type { Forecast } from "../model/weather";
import { RainIcon, ThermometerIcon } from "./icons";

interface Props {
  forecast?: Forecast | null;
}

const WeatherForecast: React.FC<Props> = ({ forecast }) => {
  if (!!forecast && forecast.length) {
    return (
      <div>
        <h2 className="text-xl pt-4 pb-8 text-center">Forecast</h2>
        <div className="flex flex-col gap-y-6">
          {forecast.map((item, index) => (
            <div key={`forecast-item-${index}`} className="px-4">
              <div className="flex flex-row items-start pb-2">
                <p className="grow text-lg">{item.name}</p>
                <span className="grid grid-cols-2 gap-4">
                  <span className="flex flex-row items-center gap-2 w-[80px]">
                    <RainIcon />
                    {`${item.percentPrecipitation}%`}
                  </span>
                  <span className="flex flex-row gap-2 w-[80px]">
                    <ThermometerIcon />
                    {item.temperature.f}&deg; F
                  </span>
                </span>
              </div>
              <p className="text-sm">{item.detailedForecast}</p>
              {index < forecast.length - 1 && (
                <hr className="my-6 text-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default WeatherForecast;
