import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Donor from "../models/Doner.model.js";
import User from "../models/User.model.js";

const createDonor = asyncHandler(async (req, res) => {
    const { age, weight, height, gender, bloodGroup, contactInfo, location } = req.body;

    // Check required fields
    if (!age || !weight || !height || !gender || !bloodGroup || !contactInfo || !location) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if contact info has required fields
    if (!contactInfo.phone || !contactInfo.address) {
        throw new ApiError(400, "Phone and address are required in contact info");
    }

    // Check if user already has a donor profile
    const existingDonor = await Donor.findOne({ user: req.user._id });
    if (existingDonor) {
        throw new ApiError(409, "Donor profile already exists for this user");
    }

    const newDonor = await Donor.create({
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
    const populatedDonor = await Donor.findById(newDonor._id)
        .populate("user", "fullName email")
        .select("-__v");

    if (!populatedDonor) {
        throw new ApiError(500, "Failed to create donor profile");
    }

    return res.status(201).json(
        new ApiResponse(201, populatedDonor, "Donor profile created successfully")
    );
});

const getDonorProfile = asyncHandler(async (req, res) => {
    const donor = await Donor.findOne({ user: req.user._id })
        .populate("user", "fullName email")
        .select("-__v");

    if (!donor) {
        throw new ApiError(404, "Donor profile not found");
    }

    return res.status(200).json(
        new ApiResponse(200, donor, "Donor profile retrieved successfully")
    );
});

const updateDonorProfile = asyncHandler(async (req, res) => {
    const { age, weight, height, gender, bloodGroup, contactInfo, location, isAvailable } = req.body;

    const updateData = {};
    if (age !== undefined) updateData.age = age;
    if (weight !== undefined) updateData.weight = weight;
    if (height !== undefined) updateData.height = height;
    if (gender !== undefined) updateData.gender = gender;
    if (bloodGroup !== undefined) updateData.bloodGroup = bloodGroup;
    if (contactInfo !== undefined) updateData.contactInfo = contactInfo;
    if (location !== undefined) updateData.location = location;
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable;

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(400, "No valid fields to update");
    }

    const updatedDonor = await Donor.findOneAndUpdate(
        { user: req.user._id },
        updateData,
        { new: true, runValidators: true }
    ).populate("user", "fullName email")
     .select("-__v");

    if (!updatedDonor) {
        throw new ApiError(404, "Donor profile not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedDonor, "Donor profile updated successfully")
    );
});

const getAllDonors = asyncHandler(async (req, res) => {
    const { bloodGroup, location, page = 1, limit = 10 } = req.query;
    
    const filter = { isAvailable: true, isVerified: true };
    
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (location) filter.location = new RegExp(location, 'i'); // Case-insensitive search

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
        populate: { path: "user", select: "fullName email" },
        select: "-__v"
    };

    const donors = await Donor.paginate(filter, options);

    return res.status(200).json(
        new ApiResponse(200, donors, "Donors retrieved successfully")
    );
});

const getDonorById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const donor = await Donor.findById(id)
        .populate("user", "fullName email")
        .select("-__v -contactInfo.phone"); // Exclude phone number for privacy

    if (!donor) {
        throw new ApiError(404, "Donor not found");
    }

    return res.status(200).json(
        new ApiResponse(200, donor, "Donor retrieved successfully")
    );
});

export {
    createDonor,
    getDonorProfile,
    updateDonorProfile,
    getAllDonors,
    getDonorById
};