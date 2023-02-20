import mongoose from "mongoose";

const StationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
        prices: {
            type: [],
            of: String,
        },
        reviews: {
            type: [],
            of: String,
        }
    },
    { timestamps: true }
);

const Station = mongoose.model("Station", StationSchema);
export default Station;
