import PlayerStats from "../models/playerStatsModel.js";
import TournamentSummary from "../models/tournamentSummaryModel.js";

export const getTournamentSummary = async (req, res) => {
  try {
    const playerStats = await PlayerStats.find();

    const overallRuns = playerStats.reduce((acc, player) => acc + player.totalRuns, 0);
    const overallWickets = playerStats.reduce((acc, player) => acc + player.wickets, 0);

    const maxRuns = Math.max(...playerStats.map(player => player.totalRuns));
    const highestRunScorers = playerStats.filter(player => player.totalRuns === maxRuns).map(player => player.name);

    const maxWickets = Math.max(...playerStats.map(player => player.wickets));
    const highestWicketTakers = playerStats.filter(player => player.wickets === maxWickets).map(player => player.name);

    const summary = {
      overallRuns,
      overallWickets,
      highestRunScorers,
      highestWicketTakers
    };

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
