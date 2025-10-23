import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, // store username
  meetingCode: { type: String, required: true },
  date: { type: Date, default: Date.now }     // automatically store meeting date
});

export const Meeting = mongoose.model("Meeting", meetingSchema);
