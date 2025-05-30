import Error from "./components/Error";
import Loader from "./components/Loader";
import WeatherForecast from "./components/WeatherForecast";
import { useGeolocation } from "./hooks/use-geo-location";
import { useWeatherData } from "./hooks/use-weather-data";

function App() {
  const { coords, isLoading: geoLoading, isError: geoError } = useGeolocation();
  const {
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
        <div className="w-32 h-32 mx-auto flex items-center justify-center shadow-sm rounded-lg">
          <p className="text-4xl">{currentTemperature.f} &deg; F</p>
        </div>
      </div>
      <WeatherForecast forecast={forecast} />
    </>
  );
}

export default App;
