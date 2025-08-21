import express from 'express';
import { createProduct, deleteProduct, findProduct, getProduct, UpdateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getProduct);
router.get('/products/:id', findProduct );
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct );
router.patch('/products/:id', UpdateProduct );



export default router;
