import {Router} from "express";
import {
    createDonorRequest,
    getAdminDonorRequests,
    confirmDonorRequest,
    getAllDonorRequests,
    getDonorRequestById,
    reassignDonorRequest
} from "../controllers/donerRequest.controller.js";
import { verifyLogin } from "../middlewares/authMiddleware.js";
import { verifyAdmin } from "../middlewares/adminMiddleware.js";

const router = Router();

// Create donor request (protected - requires user login)
router.route("/createDonorRequest").post(verifyLogin, createDonorRequest); //this

// Get all donor requests (admin only)
router.route("/getAllDonorRequests").get(verifyAdmin, getAllDonorRequests); //this

// Get specific donor request
router.route("/getDonorRequestById/:id").get(verifyLogin, getDonorRequestById); //this

// Admin routes
router.route("/getAdminDonorRequests").get(verifyAdmin, getAdminDonorRequests);
router.route("/confirmDonorRequest/:requestId").patch(verifyAdmin, confirmDonorRequest); //this
router.route("/reassignDonorRequest/:requestId").patch(verifyAdmin, reassignDonorRequest);

export default router;