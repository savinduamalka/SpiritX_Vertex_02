import Player from "../models/playerModel.js";
import { checkAdmin } from "./userController.js";

export const createPlayer = async (req, res) => {
  if (!checkAdmin(req)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const { name, university, category } = req.body;
  if (!name || !university || !category) {
    return res.status(400).json({ message: "Name, university, and category are required" });
  }
  try {
    const newPlayer = new Player({ name, university, category });
    await newPlayer.save();
    res.status(201).json({ message: "Player created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deletePlayer = async (req, res) => {
  if (!checkAdmin(req)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updatePlayer = async (req, res) => {
  if (!checkAdmin(req)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    await Player.findByIdAndUpdate
      (req
        .params
        .id, req.body);
    res.status(200).json({ message: "Player updated successfully" });
  }
  catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }     
}
