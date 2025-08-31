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
import {verifyLogin} from "../middlewares/authMiddleware.js"

const router = Router();

router.route("/register").post(verifyLogin, adminRegister);
router.route("/password/generate").get(verifyLogin, adminPasswordGenerate);
router.route("/login").post(adminLogin);
router.route("/profile").get(verifyAdmin, currentAdmin);
router.route("/logout").get(verifyAdmin, logOutAdmin);
router.route("/update").put(verifyAdmin, updateAdminProfile);

export default router;
