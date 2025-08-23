import mongoose from "mongoose";

const organSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["kidney","liver","heart","lung","cornea","pancreas","intestine"]
  },

  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true
  }, 
  
  doner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  status: {
    type: String,
    enum: ["available", "reserved", "transplanted"],
    default: 'available'
  }
}, {timestamps: true});

const Organ = mongoose.model('Organ', organSchema);
export default Organ;
