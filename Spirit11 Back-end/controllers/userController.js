import mongoose from "mongoose";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, password, role = "user" } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (username.length < 8) {
    return res.status(400).json({ message: "Username must be at least 8 characters long" });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Password must contain at least one lowercase letter, one uppercase letter, and one special character" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Generate a unique userId
    const lastUser = await User.findOne().sort({ userId: -1 });
    const userId = lastUser && lastUser.userId ? lastUser.userId + 1 : 1;

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ userId: Number(userId), username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const payload = {
      id: user._id,
      userId: user.userId,
      username: user.username,
      role: user.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token, role: user.role, username: user.username, userId: user.userId });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export function checkAdmin(req) {
  if (!req.user) {
    return false;
  }
  if (req.user.role !== 'admin') {
    return false;
  }
  return true;
}

export function checkCustomer(req) {
  if (!req.user) {
    return false;
  }
  if (req.user.role !== 'user') {
    return false;
  }
  return true;
}
