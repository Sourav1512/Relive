import mongoose from "mongoose";

const organSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["kidney","liver","heart","lung","cornea","pancreas","intestine"]
  },
}, {timestamps: true});

const Organ = mongoose.model('Organ', organSchema);
export default Organ;
