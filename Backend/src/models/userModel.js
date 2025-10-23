// src/models/userModel.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String, default: null }, // Add this line
});

export const User = mongoose.model("User", userSchema);
