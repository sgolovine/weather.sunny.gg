import viteLogo from "/vite.svg";
import "./App.css";
import { useGeolocation } from "./hooks/use-geo-location";
import { useWeatherData } from "./hooks/use-weather-data";

function App() {
  const { coords, isLoading: geoLoading, isError: geoError } = useGeolocation();
  const {
    isLoading: weatherLoading,
    isError: weatherError,
    currentTemperature,
    // forecast,
    stationName,
    stationId,
  } = useWeatherData(coords);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Weather App</h1>
      <p>Welcome to my weather app</p>

      <table>
        <tbody>
          <tr>
            <td>Geolocation Loading</td>
            <td>{geoLoading ? "TRUE" : "FALSE"}</td>
          </tr>
          <tr>
            <td>Geolocation Error</td>
            <td>{geoError ? "TRUE" : "FALSE"}</td>
          </tr>
          <tr>
            <td>Weather Loading</td>
            <td>{weatherLoading ? "TRUE" : "FALSE"}</td>
          </tr>
          <tr>
            <td>Weather Error</td>
            <td>{weatherError ? "TRUE" : "FALSE"}</td>
          </tr>
          <tr>
            <td>Station</td>
            <td>
              {!!stationId && !!stationName
                ? `${stationName} (${stationId})`
                : "---"}
            </td>
          </tr>
          <tr>
            <td>Current Temperature</td>
            <td>
              {!!currentTemperature.c && !!currentTemperature.f
                ? `${currentTemperature.c}C / ${currentTemperature.f}F`
                : "---"}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;
