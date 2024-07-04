import { Model, Types } from 'mongoose';
import { IProduct } from '../product/product.interface';

export type IOrder = {
    email: string;
    productId: Types.ObjectId | IProduct | string;
    price: number;
    quantity: number;
    isDeleted: boolean;
};

export type IOrderMethods = {};

// for both instance and static methods
export interface OrderModel extends Model<IOrder, {}, IOrderMethods> {}
