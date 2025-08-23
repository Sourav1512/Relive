import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  organType: {
    type: String,
    required: true,
    enum: ["kidney", "liver", "heart", "lung", "cornea", "pancreas", "intestine"]
  },

  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true
  }, 

  urgencyLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },

  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'matched', 'fulfilled', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
export default Request;