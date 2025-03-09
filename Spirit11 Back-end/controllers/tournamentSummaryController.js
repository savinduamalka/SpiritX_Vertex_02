import PlayerStats from "../models/playerStatsModel.js";
import TournamentSummary from "../models/tournamentSummaryModel.js";

export const getTournamentSummary = async (req, res) => {
  try {
    const playerStats = await PlayerStats.find();

    const overallRuns = playerStats.reduce((acc, player) => acc + player.totalRuns, 0);
    const overallWickets = playerStats.reduce((acc, player) => acc + player.wickets, 0);

    const highestRunScorer = playerStats.reduce((prev, current) => (prev.totalRuns > current.totalRuns) ? prev : current);
    const highestWicketTaker = playerStats.reduce((prev, current) => (prev.wickets > current.wickets) ? prev : current);

    const summary = {
      overallRuns,
      overallWickets,
      highestRunScorer: highestRunScorer.name,
      highestWicketTaker: highestWicketTaker.name
    };

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
