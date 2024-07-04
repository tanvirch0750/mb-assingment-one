import { z } from 'zod';

// Product schema
const orderValidationSchema = z.object({
    email: z
        .string({
            required_error: 'Customer email is required',
            invalid_type_error: 'Customer email must be a string',
        })
        .email({ message: 'Invalid email address' }),
    productId: z.string({
        required_error: 'Product Id is required',
        invalid_type_error: 'Product id must be a string',
    }),
    price: z.number({
        required_error: 'Product price is required',
        invalid_type_error: 'Product price must be a number',
    }),
    quantity: z.number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
    }),

    isDeleted: z.boolean().default(false),
});

export default orderValidationSchema;
