import { Request, Response } from 'express';
import { IOrder } from './order.interface';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData: IOrder = req.body as unknown as IOrder;

        const zodParseData = orderValidationSchema.parse(orderData);

        const result = await OrderServices.createNewOrderIntoDB(zodParseData);

        res.status(200).json({
            success: true,
            message: 'Order is created successfully',
            data: result,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Order creation failed',
            error: error,
        });
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    const email = req.query.email as string;

    try {
        const result = await OrderServices.getAllOrdersFromDB(email);
        res.status(200).json({
            success: true,
            message: email
                ? 'Orders fetched successfully for user email!'
                : 'Orders fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:
                error.message ||
                'Something went wrong - can not retrived order',
            error: error,
        });
    }
};

export const OrderController = {
    createOrder,
    getAllOrders,
};
