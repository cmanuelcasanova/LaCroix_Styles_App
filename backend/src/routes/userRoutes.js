import express from 'express';
import { createUser, login, getprofile } from '../controllers/userController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post('/auth/register', createUser);
router.post('/auth/login', login);
router.get("/auth/profile", authMiddleware, getprofile);

export default router;
