import { Router } from "express";
import {
    manualMatch, 
    getAllMatches, 
    getMatchById, 
    updateMatchStatus
} from "../controllers/match.controller.js";
import { verifyLogin } from "../middlewares/authMiddleware.js";
import { verifyAdmin } from "../middlewares/adminMiddleware.js";

const router = Router();

// Manual trigger for matching (admin only)
router.post("/manual-match", verifyAdmin, manualMatch);

// Get all matches (admin only)
router.route("/getAllMatches").get(verifyAdmin, getAllMatches); //this
router.route("/getAllMatches").get(verifyLogin, getAllMatches); //this

// Get specific match (admin only)
router.route("/getMatchById/:id").get(verifyAdmin, getMatchById); //this
router.route("/getMatchById/:id").get(verifyLogin, getMatchById); //this

router.route("/updateMatchStatus/:matchId").patch(verifyAdmin, updateMatchStatus);

export default router;