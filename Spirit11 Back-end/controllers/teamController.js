import Team from "../models/teamModel.js";
import Player from "../models/playerModel.js";
import User from "../models/userModel.js";
import PlayerStats from "../models/playerStatsModel.js";

export const selectPlayer = async (req, res) => {
  const { userId, playerId } = req.body;

  try {
    let team = await Team.findOne({ userId });
    if (!team) {
      team = new Team({ userId, players: [], budget: 0, points: 0 });
    }

    const player = await Player.findOne({ playerId });
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    if (team.players.length >= 11) {
      return res.status(400).json({ message: "Team is already full" });
    }

    const user = await User.findOne({ userId });
    const availableBalance = user.initialBudget - team.budget;

    if (availableBalance < player.price) {
      return res.status(400).json({ message: "Insufficient budget to buy this player" });
    }

    team.players.push(player._id);
    team.budget += player.price;
    await team.save();

    res.status(200).json({ message: "Player added to team", team });
  } catch (err) {
    console.error("Error in selectPlayer:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getTeam = async (req, res) => {
  const { userId } = req.params;

  try {
    const team = await Team.findOne({ userId }).populate("players");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const user = await User.findOne({ userId });
    const availableBalance = user.initialBudget - team.budget;
    const spentBalance = team.budget;

    res.status(200).json({ team, availableBalance, spentBalance });
  } catch (err) {
    console.error("Error in getTeam:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getTeamMembers = async (req, res) => {
  const { userId } = req.params;

  try {
    const team = await Team.findOne({ userId }).populate("players");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team.players);
  } catch (err) {
    console.error("Error in getTeamMembers:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const calculatePlayerPoints = (playerStats) => {
  // Extract stats
  const {
    totalRuns,
    ballsFaced,
    inningsPlayed,
    wickets,
    oversBowled,
    runsConceded
  } = playerStats;

  // Calculate batting strike rate
  let battingStrikeRate = 0;
  if (ballsFaced > 0) {
    battingStrikeRate = (totalRuns / ballsFaced) * 100;
  }

  // Calculate batting average
  let battingAverage = 0;
  if (inningsPlayed > 0) {
    battingAverage = totalRuns / inningsPlayed;
  }

  // Calculate bowling strike rate - balls per wicket
  let bowlingStrikeRate = null;
  if (wickets > 0) {
    // Convert overs to balls (1 over = 6 balls)
    const totalBallsBowled = oversBowled * 6;
    bowlingStrikeRate = totalBallsBowled / wickets;
  }

  // Calculate economy rate - runs per over
  let economyRate = 0;
  if (oversBowled > 0) {
    economyRate = runsConceded / oversBowled;
  }

  // Calculate points using the formula
  let points = (battingStrikeRate / 5 + battingAverage * 0.8);
  
  // Add bowling points
  // If bowling strike rate is undefined (wickets = 0), treat it as 0 in the formula
  const bowlingPoints = bowlingStrikeRate ? (500 / bowlingStrikeRate) : 0;
  
  // Add economy rate points if it's not zero to avoid division by zero
  const economyPoints = economyRate > 0 ? (140 / economyRate) : 0;
  
  points += (bowlingPoints + economyPoints);

  // Calculate value in rupees
  const valueInRupees = (9 * points + 100) * 1000;

  return {
    points: Math.round(points * 100) / 100, // Round to 2 decimal places
    valueInRupees: Math.round(valueInRupees)
  };
};

export const updateTeamPoints = async (userId) => {
  try {
    const team = await Team.findOne({ userId }).populate("players");
    
    if (!team) {
      console.error(`Team not found for user ${userId}`);
      return false;
    }
    
    const playerIds = team.players.map(player => player.playerId);
    const playerStats = await PlayerStats.find({ playerId: { $in: playerIds } });
    
    let totalPoints = 0;
    playerStats.forEach(player => {
      const { points } = calculatePlayerPoints(player);
      totalPoints += points;
    });
    
    // Round to 2 decimal places
    totalPoints = Math.round(totalPoints * 100) / 100;
    
    // Update team points
    team.points = totalPoints;
    await team.save();
    
    return true;
  } catch (err) {
    console.error('Error updating team points:', err);
    return false;
  }
};

export const finalizeTeam = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const team = await Team.findOne({ userId }).populate("players");
    
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    
    if (team.players.length !== 11) {
      return res.status(400).json({ message: "Team must have exactly 11 players" });
    }
    
    const success = await updateTeamPoints(userId);
    
    if (!success) {
      return res.status(500).json({ message: "Failed to update team points" });
    }
    
    res.status(200).json({ message: "Team finalized successfully", points: team.points });
  } catch (err) {
    console.error("Error in finalizeTeam:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("players")
      .sort({ points: -1 }); // Sort by points in descending order
    
    const leaderboard = await Promise.all(teams.map(async (team) => {
      const user = await User.findOne({ userId: team.userId });
      return {
        teamName: user ? user.username : "Unknown Team",
        userId: team.userId,
        points: team.points,
        playerCount: team.players.length
      };
    }));
    
    res.status(200).json(leaderboard);
  } catch (err) {
    console.error("Error in getLeaderboard:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("players");
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
