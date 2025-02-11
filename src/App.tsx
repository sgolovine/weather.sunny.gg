import { useEffect, useState } from "react";

function App() {
  const [geolocationState, setGeolocationState] = useState<{
    loading: boolean;
    error: boolean;
  }>({
    loading: true,
    error: false,
  });

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (successCallback) => {
        setGeolocationState({
          loading: false,
          error: false,
        });
        setCoords({
          lat: successCallback.coords.latitude,
          lng: successCallback.coords.longitude,
        });
      },
      (errorCallback) => {
        console.error(errorCallback);
        setGeolocationState({
          loading: false,
          error: true,
        });
      }
    );
  }, []);

  return (
    <>
      <div className="text-center pt-4 pb-2 border-b-2 border-gray-200">
        <h1 className="text-xl font-bold">Weather</h1>
        {geolocationState.loading && <p>Loading Location</p>}
        {geolocationState.error && (
          <p className="text-sm font-bold text-red-500">
            An error occurred getting your current location
          </p>
        )}
        {!!coords && (
          <p className="text-sm">
            {coords.lat}, {coords.lng}
          </p>
        )}
      </div>
    </>
  );
}

export default App;
