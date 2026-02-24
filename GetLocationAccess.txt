const GetLocation = (onSuccess: (pos: GeolocationPosition) => Promise<void>|void, onError: (err: GeolocationPositionError) => Promise<void>|void) => {
  navigator.geolocation.getCurrentPosition(
    onSuccess,
    onError,
    {
      enableHighAccuracy: true,
      // timeout: 10000,
      // maximumAge: 60000
    }
  );

}
export default GetLocation;