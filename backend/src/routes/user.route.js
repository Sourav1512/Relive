import express from 'express';
import { getUserProfile, loginUser, registerUser } from '../controllers/user.controller.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();


// register 
router.post('/register', registerUser);

// login 
router.post('/login', loginUser);

// profile
router.get('/profile', authMiddleware, getUserProfile);


export default router;
