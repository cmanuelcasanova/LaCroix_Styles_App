import express from 'express';
import { uploadfiles, deleteImage, homeslice, update_image} from '../controllers/filesController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import multer from 'multer';


const router = express.Router();
const upload = multer();


router.get("/auth/homeslice", homeslice);
router.post("/auth/upload_image", upload.any(), uploadfiles);
router.put("/auth/update_image", authMiddleware , update_image );
router.delete("/auth/delete_image", authMiddleware ,  deleteImage );

export default router;
