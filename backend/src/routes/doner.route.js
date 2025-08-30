import { Router } from "express";
import {
    createDonor,
    getDonorProfile,
    updateDonorProfile,
    getAllDonors,
    getDonorById
} from "../controllers/doner.controller.js"
import {verifyLogin} from "../middlewares/authMiddleware.js"

const router = Router();

router.route("/createdonor").post(verifyLogin, createDonor);
router.route("/donors/:id").get(verifyLogin, getDonorById);
router.route("/getAllDonors").get(verifyLogin, getAllDonors);
router.route("/getDonorProfile").get(verifyLogin, getDonorProfile);
router.route("/updateDonorProfile").put(verifyLogin, updateDonorProfile);

export default router;
