import express from 'express';
import { createProduct, deleteProduct, findProduct, getProduct, UpdateProduct,findSeccion,findTags } from '../controllers/productController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/products', getProduct);
router.get('/products/seccion', findSeccion);
router.get('/products/tags' , findTags);
router.get('/products/:id', findProduct );

router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct );
router.patch('/products/:id', UpdateProduct );



export default router;
