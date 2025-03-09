import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    playerId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    university: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

const Player = mongoose.model("Players", playerSchema);

export default Player;
