import { useEffect, useState } from "react";

const positionOptions: PositionOptions = {
  enableHighAccuracy: true,
  // 1 minute
  maximumAge: 60000,
};

export const useGeolocation = () => {
  const [locationLoading, setLocationLoading] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<boolean>(false);
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);

  const onSuccess: PositionCallback = (position) => {
    // console.log("position: ", position.toJSON());
    setLocationLoading(false);
    setLocationError(false);
    setCoords(position.coords);
  };
  const onError: PositionErrorCallback = (error) => {
    setLocationLoading(false);
    setLocationError(true);
    console.error(error.message);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      positionOptions
    );
  }, []);

  return {
    isLoading: locationLoading,
    isError: locationError,
    coords,
  };
};
