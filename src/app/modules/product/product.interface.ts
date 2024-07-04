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

// type for custom instance method
export type IProductMethods = {
    anyInstanceMethod(): Promise<string>;
};

// for both instance and static methods
export interface ProductModel
    extends Model<IProduct, Record<string, never>, IProductMethods> {
    anyInstaceMethod(): Promise<string>;
}
