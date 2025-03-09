import PlayerStats from "../models/playerStatsModel.js";
import Player from "../models/playerModel.js";
import { checkAdmin } from "./userController.js";

export const createPlayerStats = async (req, res) => {
  if (!checkAdmin(req)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const { playerId, name, category, totalRuns, ballsFaced, inningsPlayed, wickets, oversBowled, runsConceded } = req.body;
  if (!playerId || !name || !category || totalRuns == null || ballsFaced == null || inningsPlayed == null || wickets == null || oversBowled == null || runsConceded == null) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const player = await Player.findOne({ playerId });
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    const newPlayerStats = new PlayerStats({ playerId, name, category, totalRuns, ballsFaced, inningsPlayed, wickets, oversBowled, runsConceded });
    await newPlayerStats.save();
    res.status(201).json({ message: "Player stats created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getPlayerStats = async (req, res) => {
  try {
    const playerStats = await PlayerStats.find();
    res.status(200).json(playerStats);
  } catch (err) {
    console.error('Error fetching player stats:', err); // Add logging
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMultiplePlayerStats = async (req, res) => {
  const { playerIds } = req.body;

  try {
    const playerStats = await PlayerStats.find({ playerId: { $in: playerIds } });
    const players = await Player.find({ playerId: { $in: playerIds } });

    const playerStatsWithUniversity = playerStats.map(stat => {
      const player = players.find(p => p.playerId === stat.playerId);
      return {
        ...stat.toObject(),
        university: player ? player.university : null
      };
    });

    res.status(200).json(playerStatsWithUniversity);
  } catch (err) {
    console.error('Error fetching multiple player stats:', err); // Add logging
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

  return Math.round(points * 100) / 100; // Round to 2 decimal places
};

export const calculateTeamPoints = async (req, res) => {
  const { teamIds } = req.body;

  try {
    const playerStats = await PlayerStats.find({ playerId: { $in: teamIds } });
    
    if (!playerStats || playerStats.length === 0) {
      return res.status(404).json({ message: "No player stats found for the team" });
    }

    let totalTeamPoints = 0;
    
    // Calculate points for each player and sum them up
    playerStats.forEach(player => {
      const points = calculatePlayerPoints(player);
      totalTeamPoints += points;
    });

    // Round total team points to 2 decimal places
    totalTeamPoints = Math.round(totalTeamPoints * 100) / 100;
    
    // Return only the total team points, not individual player points
    res.status(200).json({ totalTeamPoints });
  } catch (err) {
    console.error('Error calculating team points:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
