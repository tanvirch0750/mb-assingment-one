import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

// Function to create a new order in the database
const createNewOrderIntoDB = async (orderData: IOrder) => {
    // Find the product by productId
    const product = await Product.findById(orderData.productId);

    if (!product) {
        throw new Error('Product not found');
    }

    // Check if ordered quantity is greter than available quantity
    if (orderData.quantity > product.inventory.quantity) {
        throw new Error('Insufficient quantity available in inventory');
    }

    // Reduce the quantity in inventory
    product.inventory.quantity -= orderData.quantity;

    // Update inStock status
    if (product.inventory.quantity === 0) {
        product.inventory.inStock = false;
    } else {
        product.inventory.inStock = true;
    }

    // Save the updated product
    await product.save();

    const result = await Order.create(orderData);

    return result;
};

// Function to retrieve all orders from the database, optionally filtered by email
const getAllOrdersFromDB = async (email?: string) => {
    let result;

    if (email) {
        result = await Order.find({ email });
    } else {
        result = await Order.find();
    }

    return result;
};

export const OrderServices = {
    createNewOrderIntoDB,
    getAllOrdersFromDB,
};
