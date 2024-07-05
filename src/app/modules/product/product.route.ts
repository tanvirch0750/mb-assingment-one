import express from 'express';
import { ProductController } from './product.controller';

// Create a new router instance
const router = express.Router();

// Define the route for creating a new product
router.post('/', ProductController.createProduct);

// Define the route for retrieving all products
router.get('/', ProductController.getAllProducts);

// Define the route for retrieving a single product by its ID
router.get('/:productId', ProductController.getSingleProduct);

// Define the route for deleting a product by its ID
router.delete('/:productId', ProductController.deleteProduct);

// Define the route for updating a product by its ID
router.patch('/:productId', ProductController.updateProduct);

// Export the router as ProductRoutes
export const ProductRoutes = router;
