import { apiClient } from "./api-client";

type UnitValue = {
  unitCode: string;
  value: number | null;
};

type QualityControlledUnitValue = UnitValue & {
  qualityControl: string;
};

type CloudLayer = {
  base: UnitValue;
  amount: string;
};

type GetLatestObservationResponse = {
  id: string;
  properties: {
    "@id": string;
    "@type": string;
    elevation: UnitValue;
    station: string;
    stationId: string;
    stationName: string;
    timestamp: string;
    rawMessage: string;
    textDescription: string;
    icon: string;
    presentWeather: unknown[];
    temperature: QualityControlledUnitValue;
    dewpoint: QualityControlledUnitValue;
    windDirection: QualityControlledUnitValue;
    windSpeed: QualityControlledUnitValue;
    windGust: QualityControlledUnitValue | null;
    barometricPressure: QualityControlledUnitValue;
    seaLevelPressure: QualityControlledUnitValue;
    visibility: QualityControlledUnitValue;
    maxTemperatureLast24Hours: UnitValue | null;
    minTemperatureLast24Hours: UnitValue | null;
    precipitationLastHour: QualityControlledUnitValue | null;
    precipitationLast3Hours: QualityControlledUnitValue | null;
    precipitationLast6Hours: QualityControlledUnitValue | null;
    relativeHumidity: QualityControlledUnitValue;
    windChill: QualityControlledUnitValue | null;
    heatIndex: QualityControlledUnitValue | null;
    cloudLayers: CloudLayer[];
  };
};

export function getLatestObservation(
  stationId: string
): Promise<{ data: GetLatestObservationResponse }> {
  return apiClient.get(`/stations/${stationId}/observations/latest`);
}
