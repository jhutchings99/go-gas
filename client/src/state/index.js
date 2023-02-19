import { createSlice } from "@reduxjs/toolkit";

/* GLOBAL STATE */
const initialState = {
    mode: "light",
    user: null,
    token: null,
    stations: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFavoriteStations: (state, action) => {
            if (state.user) {
                state.user.favorites = action.payload.favoriteStations
            } else {
                console.error("User favorites non existant")
            }
        },
        setStations: (state, action) => {
            state.stations = action.payload.stations
        },
        setStation: (state, action) => {
            const updatedStations = state.stations.map((station) => {
                if (station._id === action.payload.station._id) {
                    return action.payload.station;
                }
                return station;
            });
            state.stations = updatedStations;
        },
    },
});

export const { setMode, setLogin, setLogout, setFavoriteStations, setStations, setStation } = authSlice.actions;
export default authSlice.reducer;