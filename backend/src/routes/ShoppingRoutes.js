import express from 'express';
import { getShopping, createShopping, deleteItems} from '../controllers/shoppingController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";



const router = express.Router();



router.get("/auth/shopping", authMiddleware, getShopping);
router.post("/auth/shopping", authMiddleware, createShopping);
router.delete("/auth/shopping/:productId", authMiddleware , deleteItems );

export default router;
