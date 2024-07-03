import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getSingleProduct);
router.delete('/:productId', ProductController.deleteProduct);
router.patch('/:productId', ProductController.updateProduct);

export const ProductRoutes = router;
