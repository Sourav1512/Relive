import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'hospital', 'medical'],
        default: 'admin'
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
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
    userName : {
        type: String,
    },
    password: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true });

adminSchema.plugin(mongoosePaginate);

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
