import { Model } from 'mongoose';

export type IVariant = {
    type: string;
    value: string;
};

export type IInventory = {
    quantity: number;
    inStock: boolean;
};

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

export type IProductMethods = {};

// for both instance and static methods
export interface ProductModel extends Model<IProduct, {}, IProductMethods> {}
