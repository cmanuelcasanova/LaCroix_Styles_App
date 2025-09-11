import express from 'express';
import { getShopping, createShopping} from '../controllers/shoppingController.js';
//import { authMiddleware } from "../middleware/authMiddleware.js";
//import multer from 'multer';


const router = express.Router();



router.get("/auth/shopping",  getShopping);
router.post("/auth/shopping", createShopping);
//router.delete("/auth/shopping", deleteItems );

export default router;
