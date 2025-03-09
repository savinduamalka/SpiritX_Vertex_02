import mongoose from "mongoose";

const tournamentSummarySchema = new mongoose.Schema({
    overallRuns: {
        type: Number,
        required: true,
    },
    overallWickets: {
        type: Number,
        required: true,
    },
    highestRunScorer: {
        type: String,
        required: true,
    },
    highestWicketTaker: {
        type: String,
        required: true,
    }
});

const TournamentSummary = mongoose.model("TournamentSummary", tournamentSummarySchema);

export default TournamentSummary;
