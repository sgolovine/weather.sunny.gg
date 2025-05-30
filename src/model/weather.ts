export type Temperature = {
  f: number | null;
  c: number | null;
};

export type Forecast = {
  // "This Afternoon", "Tomorrow Morning", etc.
  name: string;
  temperature: Temperature;
  shortForecast: string;
  detailedForecast: string;
  percentPrecipitation: number;
  windLabel: string;
}[];
