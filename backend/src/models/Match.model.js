import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  organ: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organ",
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doner",
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipient",
    required: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: false
  },
  status: {
    type: String,
    enum: ["awaiting-approval", "approved", "rejected", "completed"],
    default: "awaiting-approval"
  }
}, { timestamps: true });

const Match = mongoose.model("Match", matchSchema);
export default Match;
