import { Router } from 'express';
import { registerUser, loginUser, currentUser, logOutUser } from "../controllers/user.controller.js"
import { verifyLogin } from "../middlewares/authMiddleware.js"


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(verifyLogin, loginUser);
router.route("/profile").get(verifyLogin, currentUser);
router.route("/logout").post(verifyLogin, logOutUser);

export default router;
