import express from 'express';
import { createProduct, deleteProduct, findProduct, getProduct, UpdateProduct,findCategory,findTags } from '../controllers/productController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/products', getProduct);
router.get('/products/category', findCategory);
router.get('/products/tags' , findTags);
router.get('/products/:id', findProduct );

router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct );
router.patch('/products/:id', UpdateProduct );



export default router;
