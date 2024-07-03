import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: IProduct) => {
    const result = await Product.create(productData);

    return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
    let query = {};

    if (searchTerm) {
        query = { name: { $regex: searchTerm, $options: 'i' } };
    }

    const result = await Product.find(query);

    return result;
};

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById({ _id: id });

    return result;
};

const updateProductIntoDB = async (
    id: string,
    updatedProductData: Partial<IProduct>,
) => {
    const result = await Product.findByIdAndUpdate(
        { _id: id },
        updatedProductData,
        { new: true },
    );

    return result;
};

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
