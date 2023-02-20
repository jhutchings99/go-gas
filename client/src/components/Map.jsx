import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const Map = () => {
    const center = useMemo(() => ({ lat: 37.095169, lng: -113.575974 }), []);
    let stations = useSelector((state) => state.stations);
    let currentStationLat;
    let currentStationLng;


    // if on home page mark all stations on map else mark only current station

    const stationId = window.location.pathname.split("/")[2];

    const currentStation = stations.find((station) => station._id === stationId);

    if (stationId) {
        stations = [currentStation]
        currentStationLat = stations[0].lat;
        currentStationLng = stations[0].lng;
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;

    if (stationId) {
        return (
            <GoogleMap zoom={19} center={{ lat: currentStationLat, lng: currentStationLng }} mapContainerClassName="map-container">
                {stations.map((station) => (
                    <MarkerF
                        key={station._id}
                        position={{ lat: station.lat, lng: station.lng }}
                    />
                ))}
            </GoogleMap>
        )
    } else {
        return (
            <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
                {stations.map((station) => (
                    <MarkerF
                        key={station._id}
                        position={{ lat: station.lat, lng: station.lng }}
                    />
                ))}
            </GoogleMap>
        )
    }


}

export default Map;