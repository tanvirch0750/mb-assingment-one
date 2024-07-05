import { Request, Response } from 'express';
import { IProduct } from './product.interface';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

// Controller function to create a new product
const createProduct = async (req: Request, res: Response) => {
    try {
        // Extract product data from the request body
        const productData: IProduct = req.body as unknown as IProduct;

        // Validate and parse the product data
        const zodParseData = productValidationSchema.parse(productData);

        // Create the product using the service function
        const result = await ProductServices.createProductIntoDB(zodParseData);

        res.status(200).json({
            success: true,
            message: 'Product is created successfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
        const errorMessage =
            (error as Error).message || 'Product Creation failed';

        res.status(500).json({
            success: false,
            message: errorMessage,
            error: error,
        });
    }
};

// Controller function to get all products, optionally filtered by a search term
const getAllProducts = async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm as string;

    try {
        const result = await ProductServices.getAllProductsFromDB(searchTerm);

        if (result.length > 0) {
            res.status(200).json({
                success: true,
                message: searchTerm
                    ? `Products matching search term '${searchTerm}' fetched successfully!`
                    : 'Products retrived successfully',
                data: result,
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'No products found',
                data: result,
            });
        }
    } catch (error) {
        console.log(error);
        const errorMessage =
            (error as Error).message ||
            'Something went wrong - can not retrived product';

        res.status(500).json({
            success: false,
            message: errorMessage,
            error: error,
        });
    }
};

// Controller function to get a single product by its ID
const getSingleProduct = async (req: Request, res: Response) => {
    const productId = req?.params?.productId;

    try {
        const result = await ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product retrived successfully',
            data: result,
        });
    } catch (error) {
        console.log(error);

        const errorMessage = (error as Error).message || 'No product found';

        res.status(500).json({
            success: false,
            message: errorMessage,
            error: error,
        });
    }
};

// Controller function to update an existing product by its ID
const updateProduct = async (req: Request, res: Response) => {
    const productId = req?.params?.productId;

    const productData: Partial<IProduct> = req.body;

    try {
        const result = await ProductServices.updateProductIntoDB(
            productId,
            productData,
        );
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: result,
        });
    } catch (error) {
        console.log(error);

        const errorMessage =
            (error as Error).message ||
            'Something went wrong - can not update product';

        res.status(500).json({
            success: false,
            message: errorMessage,
            error: error,
        });
    }
};

// Controller function to delete a product by its ID
const deleteProduct = async (req: Request, res: Response) => {
    const productId = req?.params?.productId;

    try {
        await ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: null,
        });
    } catch (error) {
        console.log(error);

        const errorMessage =
            (error as Error).message ||
            'Something went wrong - can not delete product';

        res.status(500).json({
            success: false,
            message: errorMessage,
            error: error,
        });
    }
};

export const ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
