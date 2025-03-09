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
