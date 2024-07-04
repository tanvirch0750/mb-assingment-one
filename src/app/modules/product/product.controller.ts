import { Request, Response } from 'express';
import { IProduct } from './product.interface';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData: IProduct = req.body as unknown as IProduct;

        const zodParseData = productValidationSchema.parse(productData);

        const result = await ProductServices.createProductIntoDB(zodParseData);

        res.status(200).json({
            success: true,
            message: 'Product is created successfully',
            data: result,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Product Creation failed',
            error: error,
        });
    }
};

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
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:
                error.message ||
                'Something went wrong - can not retrived product',
            error: error,
        });
    }
};

const getSingleProduct = async (req: Request, res: Response) => {
    const productId = req?.params?.productId;

    try {
        const result = await ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product retrived successfully',
            data: result,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'No product found',
            error: error,
        });
    }
};

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
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong - can not update product',
            error: error,
        });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    const productId = req?.params?.productId;

    try {
        const result = await ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: null,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong - can not delete product',
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
