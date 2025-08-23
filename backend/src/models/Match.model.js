import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  organ: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organ",
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["awaiting-approval", "approved", "rejected", "completed"],
    default: "awaiting-approval"
  },
  matchDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Match = mongoose.model("Match", matchSchema);
export default Match;
