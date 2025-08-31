import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/User.model.js";
import Admin from "../models/Admin.model.js";
import Organ from "../models/Organ.model.js";
import Match from "../models/Match.model.js";
import DonerRequest from "../models/DonerRequest.model.js";
import Doner from "../models/Doner.model.js";
import RecipientRequest from "../models/RecipientRequest.model.js";
import Recipient from "../models/Recipient.model.js";
import mongoose from "mongoose";
import {runMatchingProcess } from "../cron/matchingCron.js"

// Manual trigger for matching process
const manualMatch = asyncHandler(async (req, res) => {
    const result = await runMatchingProcess();

    return res.status(200).json(
        new ApiResponse(200, {
            matchesCreated: result.matchesCreated,
            errors: result.errors
        }, "Manual matching process completed successfully")
    );
});

// Get all matches
const getAllMatches = asyncHandler(async (req, res) => {
    const matches = await Match.find()
        .populate('organ', 'type')
        .populate({
            path: 'donor',
            populate: {
                path: 'user',
                select: 'fullName email'
            }
        })
        .populate({
            path: 'recipient',
            populate: {
                path: 'user',
                select: 'fullName email'
            }
        })
        .populate({
            path: 'admin',
            populate: {
                path: 'user',
                select: 'fullName email'
            }
        })
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, matches, "Matches retrieved successfully")
    );
});

// Get match by ID
const getMatchById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const match = await Match.findById(id)
        .populate('organ', 'type')
        .populate({
            path: 'donor',
            populate: {
                path: 'user',
                select: 'fullName email'
            }
        })
        .populate({
            path: 'recipient',
            populate: {
                path: 'user',
                select: 'fullName email'
            }
        })
        .populate({
            path: 'admin',
            populate: {
                path: 'user',
                select: 'fullName email'
            }
        });

    if (!match) {
        throw new ApiError(404, "Match not found");
    }

    return res.status(200).json(
        new ApiResponse(200, match, "Match retrieved successfully")
    );
});

// Update match status (only by assigned admin)
const updateMatchStatus = asyncHandler(async (req, res) => {
    const { matchId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['approved', 'rejected', 'completed'].includes(status)) {
        throw new ApiError(400, "Status must be either 'approved', 'rejected', or 'completed'");
    }

    // Find the match
    const match = await Match.findById(matchId);
    if (!match) {
        throw new ApiError(404, "Match not found");
    }

    // Check if the current admin is assigned to this match
    if (match.admin.toString() !== req.admin._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this match");
    }

    // Update the status
    match.status = status;
    await match.save();

    // Populate the updated match
    const populatedMatch = await Match.findById(matchId)
        .populate('organ', 'type')
        .populate({
            path: 'donor',
            populate: {
                path: 'user',
                select: 'fullName email'
            }
        })
        .populate({
            path: 'recipient',
            populate: {
                path: 'user',
                select: 'fullName email'
            }
        })
        .populate({
            path: 'admin',
            populate: {
                path: 'user',
                select: 'fullName email'
            }
        });

    return res.status(200).json(
        new ApiResponse(200, populatedMatch, `Match status updated to ${status} successfully`)
    );
});

// Update donor and recipient request statuses using match ID
const updateRequestStatusByMatchId = asyncHandler(async (req, res) => {
    const { matchId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['fulfilled', 'rejected'].includes(status)) {
        throw new ApiError(400, "Status must be either 'fulfilled' or 'rejected'");
    }

    // Find the match with request references
    const match = await Match.findById(matchId)
        .select('donorRequest recipientRequest admin');

    if (!match) {
        throw new ApiError(404, "Match not found");
    }

    // Check if the current admin is assigned to this match
    if (match.admin && match.admin.toString() !== req.admin._id.toString()) {
        throw new ApiError(403, "You are not authorized to update requests for this match");
    }

    // Update donor request status
    const updatedDonorRequest = await DonerRequest.findByIdAndUpdate(
        match.donorRequest,
        { status: status },
        { new: true, runValidators: true }
    ).populate('organType', 'type')
     .populate('doner', 'bloodGroup location age gender')
     .populate({
        path: 'admin',
        populate: {
            path: 'user',
            select: 'fullName email'
        }
    });

    if (!updatedDonorRequest) {
        throw new ApiError(404, "Donor request not found");
    }

    // Update recipient request status
    const updatedRecipientRequest = await RecipientRequest.findByIdAndUpdate(
        match.recipientRequest,
        { status: status },
        { new: true, runValidators: true }
    ).populate('organType', 'type')
     .populate({
        path: 'recipient',
        select: 'bloodGroup location age gender',
        populate: {
            path: 'user',
            select: 'fullName email'
        }
    })
     .populate({
        path: 'admin',
        populate: {
            path: 'user',
            select: 'fullName email'
        }
    });

    if (!updatedRecipientRequest) {
        throw new ApiError(404, "Recipient request not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {
            donorRequest: updatedDonorRequest,
            recipientRequest: updatedRecipientRequest
        }, `Both donor and recipient request statuses updated to ${status} successfully`)
    );
});

export { manualMatch, getAllMatches, getMatchById, updateMatchStatus, updateRequestStatusByMatchId };