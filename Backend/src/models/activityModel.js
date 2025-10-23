// src/models/activityModel.js

import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  meetingCode: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Activity = mongoose.model("Activity", activitySchema);
