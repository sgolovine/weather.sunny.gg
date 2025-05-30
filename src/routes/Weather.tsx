import type { ReactNode } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import WeatherForecast from "../components/WeatherForecast";
import { useGeolocation } from "../hooks/use-geo-location";
import { useWeatherData } from "../hooks/use-weather-data";
import { SettingsIcon } from "../components/icons";
import IconButton from "../components/IconButton";

const WeatherContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-lg mx-auto py-8">
      <IconButton href="/settings">
        <SettingsIcon />
      </IconButton>
      <h1 className="text-2xl text-center">Weather</h1>
      {children}
    </div>
  );
};

const WeatherScreen: React.FC = () => {
  const { coords, isLoading: geoLoading, isError: geoError } = useGeolocation();
  const {
    isCelsiusPreferred,
    isLoading: weatherLoading,
    isError: weatherError,
    currentTemperature,
    forecast,
    stationName,
    stationId,
  } = useWeatherData(coords);

  const stationLabel: string | null =
    !!stationName && !!stationId ? `${stationName} (${stationId})` : null;

  if (geoError) {
    return (
      <div className="py-4 px-2">
        <Error>Error getting the current location</Error>
      </div>
    );
  }

  if (weatherError) {
    return (
      <div className="py-4 px-2">
        <Error>Error getting weather data</Error>
      </div>
    );
  }

  if (weatherLoading || geoLoading) {
    return <Loader />;
  }

  return (
    <>
      {stationLabel && (
        <p className="leading-loose text-sm text-center">{stationLabel}</p>
      )}
      <div className="py-4">
        <div className="w-36 h-36 mx-auto flex items-center justify-center shadow-sm rounded-lg">
          <p className="text-4xl">
            {isCelsiusPreferred ? currentTemperature.c : currentTemperature.f}{" "}
            &deg; {isCelsiusPreferred ? "C" : "F"}
          </p>
        </div>
      </div>
      <WeatherForecast
        forecast={forecast}
        isCelsiusPreferred={isCelsiusPreferred}
      />
    </>
  );
};

const WeatherRoute: React.FC = () => (
  <WeatherContainer>
    <WeatherScreen />
  </WeatherContainer>
);

export default WeatherRoute;
