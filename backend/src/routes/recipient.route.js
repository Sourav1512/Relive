import { Router } from "express";
import {
    createRecipient,
    getRecipientProfile,
    updateRecipientProfile,
    getAllRecipients,
    getRecipientById
} from "../controllers/recipient.controller.js"
import {verifyLogin} from "../middlewares/authMiddleware.js"

const router = Router();

router.route("/createrecipient").post(verifyLogin, createRecipient);
router.route("/getrecipientprofile").get(verifyLogin, getRecipientProfile);
router.route("/updaterecipientprofile").put(verifyLogin, updateRecipientProfile);
router.route("/getallrecipients").get(verifyLogin, getAllRecipients);
router.route("/getrecipientbyid/:id").get(verifyLogin, getRecipientById);

export default router;
