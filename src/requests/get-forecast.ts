import axios from "axios";

type GetForecastResponse = {
  properties: {
    units: string;
    forecastGenerator: string;
    generatedAt: string;
    updateTime: string;
    validTimes: string;
    elevation: {
      unitCode: string;
      value: number;
    };
    periods: {
      number: number;
      name: string;
      startTime: string;
      endTime: string;
      isDaytime: boolean;
      temperature: number;
      temperatureUnit: string;
      temperatureTrend: string | null;
      probabilityOfPrecipitation: {
        unitCode: string;
        value: number | null;
      };
      windSpeed: string;
      windDirection: string;
      icon: string;
      shortForecast: string;
      detailedForecast: string;
    }[];
  };
};

export function getForecast(
  forecastUrl: string
): Promise<{ data: GetForecastResponse }> {
  return axios.get(forecastUrl);
}
