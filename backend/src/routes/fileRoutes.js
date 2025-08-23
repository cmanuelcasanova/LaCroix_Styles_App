import express from 'express';
import { uploadfiles } from '../controllers/filesController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import multer from 'multer';


const router = express.Router();
const upload = multer();



router.post("/auth/upload", authMiddleware , upload.single('image'), uploadfiles);


export default router;
