import Station from "../models/Station.js";
import User from "../models/User.js";
import { v4 as uuidv4 } from 'uuid';

/* CREATE */
export const createStation = async (req, res) => {
    try {
        const { name, address, lat, lng } = req.body;
        const newStation = new Station({
            name,
            address,
            lat,
            lng
        });
        await newStation.save();

        const stations = await Station.find();

        res.status(201).json(stations);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* READ */
export const getStations = async (req, res) => {
    try {
        const stations = await Station.find();

        res.status(200).json(stations);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getStation = async (req, res) => {
    try {
        const { stationId } = req.params;
        console.log(stationId)
        const station = await Station.findById(stationId);

        res.status(200).json(station);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const createReview = async (req, res) => {
    try {
        const { stationId, userId } = req.params;
        const { review, rating } = req.body;

        const staion = await Station.findById(stationId);
        const stationReviews = staion.reviews;
        const user = await User.findById(userId);

        const newReview = {
            reviewId: uuidv4(),
            user: user,
            review: review,
            rating: rating,
            time: new Date(),
        }

        stationReviews.push(newReview);

        var newStationReviews = stationReviews.filter((value => Object.keys(value).length !== 0));

        const updatedStation = await Station.findByIdAndUpdate(
            stationId,
            { reviews: newStationReviews },
            { new: true }
        );

        res.status(200).json(updatedStation);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createPrice = async (req, res) => {
    try {
        const { stationId, userId } = req.params;
        const { price } = req.body;

        const newPrice = {
            price,
            userId,
            time: new Date(),
        }

        const station = await Station.findById(stationId);

        if (station) {
            station.prices.push(newPrice);
            await station.save();
        }

        res.status(201).json(station);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}