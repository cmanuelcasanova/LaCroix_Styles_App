import express from 'express';
import { getShopping, createShopping, deleteItems, updateItems} from '../controllers/shoppingController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";



const router = express.Router();



router.get("/auth/shopping", authMiddleware, getShopping);
router.post("/auth/shopping", authMiddleware, createShopping);
router.delete("/auth/shopping/:productId", authMiddleware , deleteItems );
router.patch("/auth/shopping/:productId", authMiddleware , updateItems );

export default router;
