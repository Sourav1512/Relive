import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Admin from "../models/Admin.model.js";
import jwt from "jsonwebtoken";

const verifyAdmin = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized")
        }
        
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        // Find admin and populate user data
        const admin = await Admin.findById(decoded?._id)
            .populate("user", "-password -refreshToken")
            .select("-password -refreshToken")
            
        if (!admin) {
            throw new ApiError(401, "Unauthorized")
        }
        
        req.admin = admin
        next()
    } catch (error) {
        throw new ApiError(401, "Unauthorized")
    }
});

export { verifyAdmin };