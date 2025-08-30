import Admin from "../models/Admin.model.js";
import User from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { options } from "../constants.js";

const accessAndRefreshTokenGenrator = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId).populate("user");
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }

        const accessToken = jwt.sign({
            _id: admin._id,
            userId: admin.user._id,
            email: admin.user.email,
            fullName: admin.user.fullName,
            role: admin.role
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

        const refreshToken = jwt.sign({
            _id: admin._id,
            userId: admin.user._id
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}

const adminRegister = asyncHandler(async (req, res) => {
    const { user, role, gender, contactInfo, location } = req.body;
    
    // Check if all required fields are present
    if (!user || !role || !gender || !contactInfo || !location) {
        throw new ApiError(400, "All fields are required");
    }
    
    // Validate contactInfo structure
    if (!contactInfo.phone || !contactInfo.address) {
        throw new ApiError(400, "Phone and address are required in contact info");
    }
    
    // Check if user exists
    const userExists = await User.findById(user);
    if (!userExists) {
        throw new ApiError(404, "User not found");
    }
    
    // Check if admin already exists for this user
    const existingAdmin = await Admin.findOne({ user });
    if (existingAdmin) {
        throw new ApiError(409, "Admin is already registered for this user");
    }
    
    const newAdmin = await Admin.create({
        user,
        role,
        gender,
        contactInfo: {
            phone: contactInfo.phone,
            address: contactInfo.address
        },
        location
    });
    
    const populatedAdmin = await Admin.findById(newAdmin._id)
        .populate("user", "email fullName")
        .select("-password -refreshToken");
    
    return res.status(201).json(
        new ApiResponse(201, populatedAdmin, "Admin registered successfully")
    );
});

const adminPasswordGenerate = asyncHandler(async (req, res) => {
    const admin = await Admin.findOne({ user: req.user._id })
        .populate("user", "email fullName");
        
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }
    
    const username = admin.user.email;
    const password = admin.user.email.split("@")[0] + Math.floor(1000 + Math.random() * 9000);

    admin.userName = username;
    admin.password = await bcrypt.hash(password, 10);
    await admin.save({ validateBeforeSave: false });
    
    return res.json(
        new ApiResponse(200, { username, password }, "Admin credentials generated successfully")
    );
});

const adminLogin = asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    
    if (!userName || !password) {
        throw new ApiError(400, "Username and password are required");
    }
    
    const admin = await Admin.findOne({ userName })
        .populate("user", "email fullName");
        
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }
    
    if (!admin.password) {
        throw new ApiError(401, "Admin credentials not set up. Please generate password first.");
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }
    
    const { accessToken, refreshToken } = await accessAndRefreshTokenGenrator(admin._id);
    const loginAdmin = await Admin.findById(admin._id)
        .populate("user", "email fullName")
        .select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { 
            admin: loginAdmin, 
            refreshToken, 
            accessToken 
        }, "Login successful"));
});

const currentAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id)
        .populate("user", "email fullName")
        .select("-password -refreshToken");
        
    return res.status(200).json(
        new ApiResponse(200, admin, "Admin data retrieved successfully")
    );
});

const logOutAdmin = asyncHandler(async (req, res) => {
    await Admin.findByIdAndUpdate(req.admin._id, {
        $unset: {
            refreshToken: 1
        }
    }, { new: true });
    
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Logout successful"));
});

// Update admin profile
const updateAdminProfile = asyncHandler(async (req, res) => {
    const { role, gender, contactInfo, location } = req.body;

    const updateData = {};
    if (role !== undefined) updateData.role = role;
    if (gender !== undefined) updateData.gender = gender;
    if (location !== undefined) updateData.location = location;
    
    // Handle contactInfo updates
    if (contactInfo !== undefined) {
        if (contactInfo.phone !== undefined) {
            updateData['contactInfo.phone'] = contactInfo.phone;
        }
        if (contactInfo.address !== undefined) {
            updateData['contactInfo.address'] = contactInfo.address;
        }
    }

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(400, "No valid fields to update");
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
        req.admin._id,
        updateData,
        { new: true, runValidators: true }
    ).populate("user", "email fullName")
     .select("-password -refreshToken");

    if (!updatedAdmin) {
        throw new ApiError(404, "Admin not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedAdmin, "Admin profile updated successfully")
    );
});

export { 
    adminRegister, 
    adminPasswordGenerate, 
    adminLogin, 
    currentAdmin, 
    logOutAdmin,
    updateAdminProfile
};