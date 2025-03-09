import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    userId: {
        type: Number,
        ref: "Users",
        required: true,
        unique: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Players",
        required: true
    }],
    budget: {
        type: Number,
        required: true,
        default: 0
    },
    points: {
        type: Number,
        required: true,
        default: 0
    }
});

const Team = mongoose.model("Teams", teamSchema);

export default Team;
