import { z } from 'zod';

// Variant schema
const variantSchema = z.object({
    type: z.string({
        required_error: 'Variant type is required',
        invalid_type_error: 'Variant type must be a string',
    }),
    value: z.string({
        required_error: 'Variant value is required',
        invalid_type_error: 'Variant value must be a string',
    }),
});

// Inventory schema
const inventorySchema = z.object({
    quantity: z.number({
        required_error: 'Inventory quantity is required',
        invalid_type_error: 'Inventory quantity must be a number',
    }),
    inStock: z.boolean({
        required_error: 'In-stock status is required',
        invalid_type_error: 'In-stock status must be a boolean',
    }),
});

// Product schema
const productValidationSchema = z.object({
    name: z.string({
        required_error: 'Product name is required',
        invalid_type_error: 'Product name must be a string',
    }),
    description: z.string({
        required_error: 'Product description is required',
        invalid_type_error: 'Product description must be a string',
    }),
    price: z.number({
        required_error: 'Product price is required',
        invalid_type_error: 'Product price must be a number',
    }),
    category: z.string({
        required_error: 'Product category is required',
        invalid_type_error: 'Product category must be a string',
    }),
    tags: z.array(z.string(), {
        required_error: 'Product tags are required',
        invalid_type_error: 'Product tags must be an array of strings',
    }),
    variants: z.array(variantSchema, {
        required_error: 'Product variants are required',
        invalid_type_error:
            'Product variants must be an array of variant objects',
    }),
    inventory: inventorySchema,
    isDeleted: z.boolean().default(false),
});

export default productValidationSchema;
