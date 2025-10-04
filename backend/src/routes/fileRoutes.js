import express from 'express';
import { uploadfiles, deleteImage, homeslice} from '../controllers/filesController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import multer from 'multer';


const router = express.Router();
const upload = multer();


router.get("/auth/homeslice", homeslice);
router.post("/auth/upload", authMiddleware , upload.single('image'), uploadfiles);
router.delete("/auth/delete", deleteImage );

export default router;
