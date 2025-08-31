import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const recipientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true
    },
    contactInfo: {
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true });

recipientSchema.plugin(mongoosePaginate);

const Recipient = mongoose.model('Recipient', recipientSchema);
export default Recipient;
