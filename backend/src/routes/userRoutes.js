import express from 'express';
import { createUser, login, getprofile, logout, recoverypass, updateuser , verifyEmail, resend_email} from '../controllers/userController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post('/auth/register', createUser);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/recoverypass', recoverypass);
router.post('/auth/updateuser',  updateuser );
router.post('/auth/verifyEmail',  verifyEmail );
router.post('/auth/resend_email',  resend_email );
router.get("/auth/profile", authMiddleware, getprofile);

export default router;
