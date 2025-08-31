import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const donerRequestSchema = new mongoose.Schema({
    organType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organ",
        required: true
    },

    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true
    },

    doner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doner",
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'matched', 'fulfilled', 'rejected'],
        default: 'pending'
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: false
    },

    adminConfirmation: {
        type: String,
        enum: ['pending', 'fulfilled', 'rejected'],
        default: "pending"
    }
}, { timestamps: true });

donerRequestSchema.plugin(mongoosePaginate);

const DonerRequest = mongoose.model('DonerRequest', donerRequestSchema);
export default DonerRequest;
