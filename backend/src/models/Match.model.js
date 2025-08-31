import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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
  donorRequest : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DonerRequest",
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipient",
    required: true
  },
  recipientRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecipientRequest",
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

matchSchema.plugin(mongoosePaginate);

const Match = mongoose.model("Match", matchSchema);
export default Match;
