import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStations } from 'state';
import StationWidget from "./StationWidget"
import Map from "components/Map"

const URL = 'http://localhost:3001';

const StationsWidget = ({ stationId, isStation = false }) => {
    const dispatch = useDispatch();
    const stations = useSelector((state) => state.stations);
    const token = useSelector((state) => state.token);

    const getStations = async () => {
        const response = await fetch(`${URL}/stations`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setStations({ stations: data }));
    };

    const getStation = async () => {
        const response = await fetch(`${URL}/stations/${stationId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setStations({ stations: data }));
    };

    useEffect(() => {
        if (isStation) {
            getStation();
        } else {
            getStations();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                }}
            >
                <WidgetWrapper
                    m="2rem 1rem"
                    sx={{
                        p: "0.1rem 0"
                    }}
                    maxHeight="85vh"
                    overflow="auto"
                    minWidth="40%"
                >
                    {
                        stations.map(
                            ({
                                _id,
                                name,
                                address,
                                prices,
                                reviews,
                            }) => (
                                <StationWidget
                                    key={_id}
                                    stationId={_id}
                                    name={name}
                                    address={address}
                                    prices={prices}
                                    reviews={reviews}
                                />

                            )
                        )
                    }
                </WidgetWrapper >
                <Map />
            </div>
        </>
    )
}

export default StationsWidget;