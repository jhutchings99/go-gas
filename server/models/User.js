import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        username: {
            type: String,
            required: true,
            min: 3,
            max: 12,
        },
        zip: {
            type: String,
            required: true,
            min: 5,
            max: 5,
        },
        favoriteStations: {
            type: Array,
            default: [],
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
