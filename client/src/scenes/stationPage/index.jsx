import { useDispatch, useSelector } from "react-redux";
import Map from "components/Map"

const StationPage = () => {
    const stations = useSelector((state) => state.stations);
    const stationId = window.location.pathname.split("/")[2];

    const currentStation = stations.find((station) => station._id === stationId);

    return (
        <div>
            <h1>Station Page</h1>
            <h2>{currentStation.name}</h2>
            <h3>{currentStation.address}</h3>
            <Map />
        </div>
    );
};

export default StationPage;