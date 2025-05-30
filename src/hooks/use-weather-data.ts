import { useQuery } from "@tanstack/react-query";
import { getPoints } from "../requests/get-points";
import { getForecast } from "../requests/get-forecast";
import { getObservationStations } from "../requests/get-observation-stations";
import { getLatestObservation } from "../requests/get-latest-observation";
import { useMemo } from "react";
import { toCelsius, toFahrenheit } from "../util/temperature-converters";
import type { Temperature, Forecast } from "../model/weather";
import { TEMPERATURE_LOCAL_STORAGE_KEY } from "../constants";

export const useWeatherData = (coords: GeolocationCoordinates | null) => {
  const tempPref = window.localStorage.getItem(TEMPERATURE_LOCAL_STORAGE_KEY);
  const isCelsiusPreferred = tempPref ? JSON.parse(tempPref) === "C" : false;

  // the first query we make is to get the points associated with
  // the users location. this will give us a URL to fetch the forecast
  // and a URL to fetch the nearby weather stations.
  const getPointsQuery = useQuery({
    queryKey: ["get-points", coords?.latitude, coords?.longitude],
    enabled: !!coords && !!coords.latitude && !!coords.longitude,
    queryFn: () =>
      getPoints({
        lat: coords?.latitude as number,
        lng: coords?.longitude as number,
      }),
  });

  // TODO: It's a bit strange that we are getting one forecast from the points
  // endpoint and another forecast from the observation station. look into how
  // we can pull forecast data from the observation station as we want to make
  // observation stations the "source of truth" for this app.
  const forecastUrl = getPointsQuery.data?.data.properties.forecast;
  const observationStationsUrl =
    getPointsQuery.data?.data.properties.observationStations;

  const forecastQuery = useQuery({
    queryKey: ["get-forecast", forecastUrl],
    queryFn: () => getForecast(forecastUrl as string),
    enabled: !!forecastUrl,
  });

  const observationStationsQuery = useQuery({
    queryKey: ["observation-stations", observationStationsUrl],
    queryFn: () => getObservationStations(observationStationsUrl as string),
    enabled: !!observationStationsUrl,
  });

  const closestObservationStation =
    observationStationsQuery.data?.data?.features?.[0]?.properties
      .stationIdentifier;

  const latestObservationQuery = useQuery({
    queryKey: ["latest-observation", closestObservationStation],
    queryFn: () => getLatestObservation(closestObservationStation as string),
    enabled: !!closestObservationStation,
  });

  const globalLoading =
    getPointsQuery.isLoading ||
    forecastQuery.isLoading ||
    observationStationsQuery.isLoading ||
    latestObservationQuery.isLoading;

  const globalRefetching =
    getPointsQuery.isRefetching ||
    forecastQuery.isRefetching ||
    observationStationsQuery.isRefetching ||
    latestObservationQuery.isRefetching;

  const globalError =
    getPointsQuery.isError ||
    forecastQuery.isError ||
    observationStationsQuery.isError ||
    latestObservationQuery.isError;

  const globalRefetchError =
    getPointsQuery.isRefetchError ||
    forecastQuery.isRefetchError ||
    observationStationsQuery.isRefetchError ||
    latestObservationQuery.isRefetchError;

  const currentTemperature: Temperature = useMemo(() => {
    if (latestObservationQuery?.data?.data?.properties?.temperature?.value) {
      const degreesCelsius =
        latestObservationQuery.data.data.properties.temperature.value;
      const degreesFahrenheit = toFahrenheit(degreesCelsius);

      return {
        c: degreesCelsius,
        f: degreesFahrenheit,
      };
    }
    return {
      c: null,
      f: null,
    };
  }, [latestObservationQuery.data?.data.properties.temperature]);

  const forecast = useMemo(() => {
    console.log(
      "forecastQuery?.data?.data?.properties",
      forecastQuery?.data?.data?.properties
    );
    const periods = forecastQuery?.data?.data?.properties?.periods ?? [];

    const forecast: Forecast = periods.map((period) => {
      const temperature: Temperature =
        period.temperatureUnit === "F"
          ? {
              f: period.temperature,
              c: toCelsius(period.temperature),
            }
          : {
              f: toFahrenheit(period.temperature),
              c: period.temperature,
            };

      const windLabel = `${period.windDirection} ${period.windSpeed}`;

      return {
        name: period.name,
        temperature,
        shortForecast: period.shortForecast,
        detailedForecast: period.detailedForecast,
        percentPrecipitation: period.probabilityOfPrecipitation?.value ?? 0,
        windLabel,
      };
    });

    return forecast;
  }, [forecastQuery?.data?.data?.properties]);

  return {
    isCelsiusPreferred,
    isLoading: globalLoading || globalRefetching,
    isError: globalError || globalRefetchError,
    currentTemperature,
    forecast,
    stationId:
      latestObservationQuery?.data?.data?.properties?.stationId ?? null,
    stationName:
      latestObservationQuery?.data?.data?.properties?.stationName ?? null,
  };
};
