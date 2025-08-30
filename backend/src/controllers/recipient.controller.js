import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Recipient from "../models/Recipient.model.js";

const createRecipient = asyncHandler(async (req, res) => {
    const { age, weight, height, gender, bloodGroup, contactInfo, location } = req.body;

    // Check required fields
    if (!age || !weight || !height || !gender || !bloodGroup || !contactInfo || !location) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if contact info has required fields
    if (!contactInfo.phone || !contactInfo.address) {
        throw new ApiError(400, "Phone and address are required in contact info");
    }

    // Check if user already has a recipient profile
    const existingRecipient = await Recipient.findOne({ user: req.user._id });
    if (existingRecipient) {
        throw new ApiError(409, "Recipient profile already exists for this user");
    }

    const newRecipient = await Recipient.create({
        user: req.user._id, // Use authenticated user's ID
        age,
        weight,
        height,
        gender,
        bloodGroup,
        contactInfo,
        location
    });

    // Populate user data for response
    const populatedRecipient = await Recipient.findById(newRecipient._id)
        .populate("user", "fullName email")
        .select("-__v");

    if (!populatedRecipient) {
        throw new ApiError(500, "Failed to create recipient profile");
    }

    return res.status(201).json(
        new ApiResponse(201, populatedRecipient, "Recipient profile created successfully")
    );
});

const getRecipientProfile = asyncHandler(async (req, res) => {
    const recipient = await Recipient.findOne({ user: req.user._id })
        .populate("user", "fullName email")
        .select("-__v");

    if (!recipient) {
        throw new ApiError(404, "Recipient profile not found");
    }

    return res.status(200).json(
        new ApiResponse(200, recipient, "Recipient profile retrieved successfully")
    );
});

const updateRecipientProfile = asyncHandler(async (req, res) => {
    const { age, weight, height, gender, bloodGroup, contactInfo, location } = req.body;

    const updateData = {};
    if (age !== undefined) updateData.age = age;
    if (weight !== undefined) updateData.weight = weight;
    if (height !== undefined) updateData.height = height;
    if (gender !== undefined) updateData.gender = gender;
    if (bloodGroup !== undefined) updateData.bloodGroup = bloodGroup;
    if (contactInfo !== undefined) updateData.contactInfo = contactInfo;
    if (location !== undefined) updateData.location = location;

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(400, "No valid fields to update");
    }

    const updatedRecipient = await Recipient.findOneAndUpdate(
        { user: req.user._id },
        updateData,
        { new: true, runValidators: true }
    ).populate("user", "fullName email")
     .select("-__v");

    if (!updatedRecipient) {
        throw new ApiError(404, "Recipient profile not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedRecipient, "Recipient profile updated successfully")
    );
});

const getAllRecipients = asyncHandler(async (req, res) => {
    const { bloodGroup, location, page = 1, limit = 10 } = req.query;
    
    const filter = { isVerified: true };
    
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (location) filter.location = new RegExp(location, 'i'); // Case-insensitive search

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
        populate: { path: "user", select: "fullName email" },
        select: "-__v -contactInfo.phone" // Exclude phone for privacy
    };

    const recipients = await Recipient.paginate(filter, options);

    return res.status(200).json(
        new ApiResponse(200, recipients, "Recipients retrieved successfully")
    );
});

const getRecipientById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const recipient = await Recipient.findById(id)
        .populate("user", "fullName email")
        .select("-__v -contactInfo.phone"); // Exclude phone for privacy

    if (!recipient) {
        throw new ApiError(404, "Recipient not found");
    }

    return res.status(200).json(
        new ApiResponse(200, recipient, "Recipient retrieved successfully")
    );
});

export {
    createRecipient,
    getRecipientProfile,
    updateRecipientProfile,
    getAllRecipients,
    getRecipientById
};