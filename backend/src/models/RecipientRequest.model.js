import mongoose from "mongoose";

const recipientRequestSchema = new mongoose.Schema({
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

    urgencyLevel: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },

    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipient",
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

const RecipientRequest = mongoose.model('RecipientRequest', recipientRequestSchema);
export default RecipientRequest;
