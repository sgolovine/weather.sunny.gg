import { apiClient } from "./api-client";

type GetPointsResponse = {
  id: string;
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    "@id": string;
    "@type": "wx:Point";
    cwa: string;
    forecastOffice: string;
    gridId: string;
    gridX: number;
    gridY: number;
    forecast: string;
    forecastHourly: string;
    forecastGridData: string;
    observationStations: string;
    relativeLocation: {
      type: "Feature";
      geometry: {
        type: "Point";
        coordinates: [number, number];
      };
      properties: {
        city: string;
        state: string;
        distance: {
          unitCode: string;
          value: number;
        };
        bearing: {
          unitCode: string;
          value: number;
        };
      };
    };
    forecastZone: string;
    county: string;
    fireWeatherZone: string;
    timeZone: string;
    radarStation: string;
  };
};

export function getPoints({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<{ data: GetPointsResponse }> {
  return apiClient.get(`/points/${lat},${lng}`);
}
