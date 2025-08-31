import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import RecipientRequest from "../models/RecipientRequest.model.js";
import Admin from "../models/Admin.model.js";
import User from "../models/User.model.js";
import Organ from "../models/Organ.model.js";
import Recipient from "../models/Recipient.model.js";

// Create recipient request and assign to first admin alphabetically
const createRecipientRequest = asyncHandler(async (req, res) => {
    const { organType, bloodGroup, urgencyLevel, recipient } = req.body;

    // Validate required fields
    if (!organType || !bloodGroup || !recipient) {
        throw new ApiError(400, "Organ type, blood group, and recipient are required");
    }

    // Check if recipient exists
    const recipientExists = await Recipient.findById(recipient);
    if (!recipientExists) {
        throw new ApiError(404, "Recipient not found");
    }

    // Check if organ type is valid (from the enum values)
    const validOrganTypes = ["kidney", "liver", "heart", "lung", "cornea", "pancreas", "intestine"];
    if (!validOrganTypes.includes(organType)) {
        throw new ApiError(400, "Invalid organ type. Must be one of: kidney, liver, heart, lung, cornea, pancreas, intestine");
    }

    const organ = await Organ.create({
        type: organType
    });

    if(!organ) {
        throw new ApiError(500, "Failed to create organ");
    }

    // Check if urgency level is valid (from the enum values)
    const validUrgencyLevels = ['low', 'medium', 'high', 'critical'];
    if (urgencyLevel && !validUrgencyLevels.includes(urgencyLevel)) {
        throw new ApiError(400, "Invalid urgency level. Must be one of: low, medium, high, critical");
    }

    // Find the first admin alphabetically by user's email
    const firstAdmin = await Admin.findOne()
        .populate("user", "email fullName")
        .sort({ "user.email": 1 }); // Sort by user email alphabetically

    if (!firstAdmin) {
        throw new ApiError(404, "No admin available to process the request");
    }

    // Create the recipient request
    const newRecipientRequest = await RecipientRequest.create({
        organType : organ._id,
        bloodGroup,
        urgencyLevel: urgencyLevel || 'medium',
        recipient,
        admin: firstAdmin._id // Assign to the first admin alphabetically
    });

    if (!newRecipientRequest) {
        throw new ApiError(500, "Failed to create recipient request");
    }

    // Populate the request with related data
    const populatedRequest = await RecipientRequest.findById(newRecipientRequest._id)
        .populate("organType", "type")
        .populate("recipient", "bloodGroup location")
        .populate({
            path: "admin",
            populate: {
                path: "user",
                select: "fullName email"
            }
        })
        .select("-__v");

    if (!populatedRequest) {
        throw new ApiError(500, "Failed to populate recipient request");
    }

    return res.status(201).json(
        new ApiResponse(201, populatedRequest, "Recipient request created and assigned to admin successfully")
    );
});

// Get all recipient requests for a specific admin
const getAdminRecipientRequests = asyncHandler(async (req, res) => {
    const { status, urgencyLevel, page = 1, limit = 10 } = req.query;
    
    const filter = { admin: req.admin._id };
    
    if (status) {
        filter.status = status;
    }
    if (urgencyLevel) {
        filter.urgencyLevel = urgencyLevel;
    }

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { urgencyLevel: -1, createdAt: -1 }, // Critical requests first
        populate: [
            { path: "organType", select: "type" },
            { 
                path: "recipient", 
                select: "bloodGroup location age gender",
                populate: {
                    path: "user",
                    select: "fullName email"
                }
            },
            { 
                path: "admin", 
                populate: { 
                    path: "user", 
                    select: "fullName email" 
                } 
            }
        ],
        select: "-__v"
    };

    const requests = await RecipientRequest.paginate(filter, options);

    return res.status(200).json(
        new ApiResponse(200, requests, "Admin recipient requests retrieved successfully")
    );
});

// Admin confirms or rejects a recipient request
const confirmRecipientRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const { confirmation } = req.body; // confirmation: 'fulfilled' or 'rejected'

    if (!confirmation || !['fulfilled', 'rejected'].includes(confirmation)) {
        throw new ApiError(400, "Valid confirmation status is required (fulfilled or rejected)");
    }

    // Find the request
    const recipientRequest = await RecipientRequest.findById(requestId)
        .populate("organType", "type")
        .populate("recipient", "bloodGroup location");

    if (!recipientRequest) {
        throw new ApiError(404, "Recipient request not found");
    }

    // Check if the current admin is assigned to this request
    if (recipientRequest.admin.toString() !== req.admin._id.toString()) {
        throw new ApiError(403, "You are not authorized to confirm this request");
    }

    // Update only the adminConfirmation field (not the status)
    recipientRequest.adminConfirmation = confirmation;
    
    // If fulfilled, also verify the recipient (but don't change the status)
    if (confirmation === 'fulfilled') {
        // Set the recipient's isVerified to true
        await Recipient.findByIdAndUpdate(
            recipientRequest.recipient._id,
            { isVerified: true },
            { new: true }
        );
    }

    await recipientRequest.save();

    // Get updated request with populated data
    const updatedRequest = await RecipientRequest.findById(requestId)
        .populate("organType", "type")
        .populate({
            path: "recipient",
            select: "bloodGroup location age gender",
            populate: {
                path: "user",
                select: "fullName email"
            }
        })
        .populate({
            path: "admin",
            populate: {
                path: "user",
                select: "fullName email"
            }
        })
        .select("-__v");

    return res.status(200).json(
        new ApiResponse(200, updatedRequest, `Recipient request ${confirmation} successfully`)
    );
});

// Get all recipient requests (for super admin or monitoring)
const getAllRecipientRequests = asyncHandler(async (req, res) => {
    const { status, adminConfirmation, urgencyLevel, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    
    if (status) filter.status = status;
    if (adminConfirmation) filter.adminConfirmation = adminConfirmation;
    if (urgencyLevel) filter.urgencyLevel = urgencyLevel;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { urgencyLevel: -1, createdAt: -1 }, // Critical requests first
        populate: [
            { path: "organType", select: "type" },
            { 
                path: "recipient", 
                select: "bloodGroup location age gender",
                populate: {
                    path: "user",
                    select: "fullName email"
                }
            },
            { 
                path: "admin", 
                populate: { 
                    path: "user", 
                    select: "fullName email" 
                } 
            }
        ],
        select: "-__v"
    };

    const requests = await RecipientRequest.paginate(filter, options);

    return res.status(200).json(
        new ApiResponse(200, requests, "All recipient requests retrieved successfully")
    );
});

// Get recipient request by ID
const getRecipientRequestById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const request = await RecipientRequest.findById(id)
        .populate("organType", "type")
        .populate({
            path: "recipient",
            select: "bloodGroup location age gender contactInfo",
            populate: {
                path: "user",
                select: "fullName email"
            }
        })
        .populate({
            path: "admin",
            populate: {
                path: "user",
                select: "fullName email"
            }
        })
        .select("-__v");

    if (!request) {
        throw new ApiError(404, "Recipient request not found");
    }

    return res.status(200).json(
        new ApiResponse(200, request, "Recipient request retrieved successfully")
    );
});

// Reassign recipient request to another admin (if needed)
const reassignRecipientRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const { adminId } = req.body;

    if (!adminId) {
        throw new ApiError(400, "Admin ID is required for reassignment");
    }

    // Check if new admin exists
    const newAdmin = await Admin.findById(adminId);
    if (!newAdmin) {
        throw new ApiError(404, "New admin not found");
    }

    // Find and update the request
    const updatedRequest = await RecipientRequest.findByIdAndUpdate(
        requestId,
        { 
            admin: adminId,
            adminConfirmation: 'pending' // Reset confirmation status
        },
        { new: true, runValidators: true }
    )
    .populate("organType", "type")
    .populate({
        path: "recipient",
        select: "bloodGroup location",
        populate: {
            path: "user",
            select: "fullName email"
        }
    })
    .populate({
        path: "admin",
        populate: {
            path: "user",
            select: "fullName email"
        }
    })
    .select("-__v");

    if (!updatedRequest) {
        throw new ApiError(404, "Recipient request not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedRequest, "Recipient request reassigned successfully")
    );
});

// Get urgent recipient requests (critical and high urgency)
const getUrgentRecipientRequests = asyncHandler(async (req, res) => {
    const { bloodGroup, location } = req.body;

    const filter = {
        urgencyLevel: { $in: ['critical', 'high'] },
        status: 'pending'
    };
    
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (location) filter.location = new RegExp(location, 'i');

    const urgentRequests = await RecipientRequest.find(filter)
        .populate("organType", "type")
        .populate({
            path: "recipient",
            select: "bloodGroup location age gender",
            populate: {
                path: "user",
                select: "fullName email"
            }
        })
        .select("organType bloodGroup urgencyLevel recipient location createdAt")
        .sort({ urgencyLevel: -1, createdAt: 1 }) // Critical first, then oldest first
        .limit(20);

    return res.status(200).json(
        new ApiResponse(200, urgentRequests, "Urgent recipient requests retrieved successfully")
    );
});

export {
    createRecipientRequest,
    getAdminRecipientRequests,
    confirmRecipientRequest,
    getAllRecipientRequests,
    getRecipientRequestById,
    reassignRecipientRequest,
    getUrgentRecipientRequests
};