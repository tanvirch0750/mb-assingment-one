import { Request, Response } from 'express';
import { IOrder } from './order.interface';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';

// Controller function to create a new order
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
    } catch (error) {
        console.log(error);
        const errorMessage =
            (error as Error).message || 'Order creation failed';

        res.status(500).json({
            success: false,
            message: errorMessage,
            error: error,
        });
    }
};

// Controller function to get all orders, optionally filtered by email
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
    } catch (error) {
        console.log(error);
        const errorMessage =
            (error as Error).message ||
            'Something went wrong - can not retrived order';

        res.status(500).json({
            success: false,
            message: errorMessage,
            error: error,
        });
    }
};

export const OrderController = {
    createOrder,
    getAllOrders,
};
