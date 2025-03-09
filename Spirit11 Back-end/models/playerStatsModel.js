import mongoose from "mongoose";

const playerStatsSchema = new mongoose.Schema({
    playerId: {
        type: mongoose.Schema.Types.String,
        ref: "Players",
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    totalRuns: {
        type: Number,
        required: true,
    },
    ballsFaced: {
        type: Number,
        required: true,
    },
    inningsPlayed: {
        type: Number,
        required: true,
    },
    wickets: {
        type: Number,
        required: true,
    },
    oversBowled: {
        type: Number,
        required: true,
    },
    runsConceded: {
        type: Number,
        required: true,
    }
});

const PlayerStats = mongoose.model("PlayerStats", playerStatsSchema);

export default PlayerStats;
