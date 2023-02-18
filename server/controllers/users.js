import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* UPDATE */
export const addRemoveFavorite = async (req, res) => {
    try {
        const { id, stationId } = req.params;
        const user = await User.findById(id);

        if (user.favoriteStations.includes(stationId)) {
            user.favoriteStations = user.favoriteStations.filter((id) => id !== stationId);
        } else {
            user.favoriteStations.push(stationId);
        }
        await user.save();

        res.status(200).json(user.favoriteStations);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}