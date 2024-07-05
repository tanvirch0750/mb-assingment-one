import { IProduct } from './product.interface';
import { Product } from './product.model';

// Function to create a new product in the database
const createProductIntoDB = async (productData: IProduct) => {
    const result = await Product.create(productData);

    return result;
};

// Function to retrieve all products from the database, with optional search term
const getAllProductsFromDB = async (searchTerm?: string) => {
    let query = {};

    // If a search term is provided, add it to the query to search by product name (case insensitive)
    if (searchTerm) {
        query = { name: { $regex: searchTerm, $options: 'i' } };
    }

    const result = await Product.find(query);

    return result;
};

// Function to retrieve a single product by its ID
const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById({ _id: id });

    return result;
};

// Function to update an existing product by its ID
const updateProductIntoDB = async (
    id: string,
    updatedProductData: Partial<IProduct>,
) => {
    const result = await Product.findByIdAndUpdate(
        { _id: id },
        updatedProductData,
        { new: true }, // Option to return the updated product
    );

    return result;
};

// Function to delete a product by its ID (soft delete by setting isDeleted flag to true)
const deleteProductFromDB = async (id: string) => {
    const result = await Product.updateOne({ _id: id }, { isDeleted: true });

    return result;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
};
