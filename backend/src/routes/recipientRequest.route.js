import {Router} from "express";
import {
    createRecipientRequest,
    getAdminRecipientRequests,
    confirmRecipientRequest,
    getAllRecipientRequests,
    getRecipientRequestById,
    reassignRecipientRequest,
    getUrgentRecipientRequests
} from "../controllers/recipientRequest.controller.js";
import { verifyLogin } from "../middlewares/authMiddleware.js";
import { verifyAdmin } from "../middlewares/adminMiddleware.js";

const router = Router();

// Create recipient request (protected - requires user login)
router.route("/createRecipientRequest").post(verifyLogin, createRecipientRequest); //this

// Get all recipient requests (admin only)
router.route("/getAllRecipientRequests").get(verifyAdmin, getAllRecipientRequests); //this

// Get urgent recipient requests (public or protected)
router.route("/getUrgentRecipientRequests").get(verifyAdmin, getUrgentRecipientRequests); //this

// Get specific recipient request
router.route("/getRecipientRequestById/:id").get(verifyLogin, getRecipientRequestById); // this

// Admin routes
router.route("/getAdminRecipientRequests").get(verifyAdmin, getAdminRecipientRequests);
router.route("/confirmRecipientRequest/:requestId").patch(verifyAdmin, confirmRecipientRequest); //this
router.route("/reassignRecipientRequest/:requestId").patch(verifyAdmin, reassignRecipientRequest);

export default router;