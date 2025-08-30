import { Router } from "express";
import { 
    adminRegister, 
    adminPasswordGenerate, 
    adminLogin, 
    currentAdmin, 
    logOutAdmin,
    updateAdminProfile
} from "../controllers/admin.controller.js";
import {verifyAdmin} from "../middlewares/adminMiddleware.js"

const router = Router();

router.route("/register").post(adminRegister);
router.route("/password/generate").post(verifyAdmin, adminPasswordGenerate);
router.route("/login").post(adminLogin);
router.route("/profile").get(verifyAdmin, currentAdmin);
router.route("/logout").post(verifyAdmin, logOutAdmin);
router.route("/update").put(verifyAdmin, updateAdminProfile);

export default router;
