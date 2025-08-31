import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const organSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["kidney","liver","heart","lung","cornea","pancreas","intestine"]
  },
}, {timestamps: true});

organSchema.plugin(mongoosePaginate);

const Organ = mongoose.model('Organ', organSchema);
export default Organ;
