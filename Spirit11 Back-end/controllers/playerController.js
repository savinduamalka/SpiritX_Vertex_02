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
