import { Model, Types } from 'mongoose';
import { IProduct } from '../product/product.interface';

export type IOrder = {
    email: string;
    productId: Types.ObjectId | IProduct | string;
    price: number;
    quantity: number;
    isDeleted: boolean;
};

// type for custom instance method
export type IOrderMethods = {
    anyInstanceMethod(): Promise<string>;
};

// for both instance and static methods
export interface OrderModel
    extends Model<IOrder, Record<string, never>, IOrderMethods> {
    anyInstanceMethod(): Promise<string>;
}
