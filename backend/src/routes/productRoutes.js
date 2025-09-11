import express from 'express';
import { createProduct, deleteProduct, findProduct, getProduct, UpdateProduct,findSeccion,findTags } from '../controllers/productController.js';
import { authMiddleware , adminMiddleware} from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/products', getProduct);
router.get('/products/seccion', findSeccion);
router.get('/products/tags' , findTags);
router.get('/products/:id', findProduct );

router.post('/products', authMiddleware, adminMiddleware , createProduct);
router.put('/products',authMiddleware , adminMiddleware , UpdateProduct );
router.delete('/products/:id', adminMiddleware, deleteProduct );




export default router;
