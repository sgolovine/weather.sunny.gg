import axios from "axios";

type GetObservationStationsResponse = {
  type: "FeatureCollection";
  features: {
    id: string;
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number]; // [longitude, latitude]
    };
    properties: {
      "@id": string;
      "@type": string;
      elevation: {
        unitCode: string;
        value: number;
      };
      stationIdentifier: string;
      name: string;
      timeZone: string;
      distance: {
        unitCode: string;
        value: number;
      };
      bearing: {
        unitCode: string;
        value: number;
      };
      forecast: string;
      county: string;
      fireWeatherZone: string;
    };
  }[];
  observationStations: string[]; // list of station URLs
  pagination: {
    next: string;
  };
};

export function getObservationStations(
  url: string
): Promise<{ data: GetObservationStationsResponse }> {
  return axios.get(url);
}
