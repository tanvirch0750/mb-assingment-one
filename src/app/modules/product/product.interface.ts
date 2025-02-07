import { Model } from 'mongoose';

// Define the type for a product variant
export type IVariant = {
    type: string;
    value: string;
};

// Define the type for product inventory
export type IInventory = {
    quantity: number;
    inStock: boolean;
};

// Define the type for a product
export type IProduct = {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: IVariant[];
    inventory: IInventory;
    isDeleted: boolean;
};

// Define the type for custom instance methods
export type IProductMethods = {
    // Example of an instance method returning a promise with a string
    anyInstanceMethod(): Promise<string>;
};

// Define the type for the Product model, including both instance and static methods
export interface ProductModel
    extends Model<IProduct, Record<string, never>, IProductMethods> {
    // Example of a static method returning a promise with a string
    anyInstaceMethod(): Promise<string>;
}
