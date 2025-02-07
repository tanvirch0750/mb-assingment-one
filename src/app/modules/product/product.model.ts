import { Schema, model } from 'mongoose';
import {
    IInventory,
    IProduct,
    IProductMethods,
    IVariant,
    ProductModel,
} from './product.interface';

// Define the schema for product variants
const variantSchema = new Schema<IVariant>({
    type: { type: String, required: [true, 'Variant type is required'] },
    value: { type: String, required: [true, 'Variant value is required'] },
});

// Define the schema for product inventory
const inventorySchema = new Schema<IInventory>({
    quantity: {
        type: Number,
        required: [true, 'Inventory quantity is required'],
    },
    inStock: { type: Boolean, required: [true, 'In-stock status is required'] },
});

// Define the schema for products, including variants and inventory
const productSchema = new Schema<IProduct, ProductModel, IProductMethods>(
    {
        name: { type: String, required: [true, 'Product name is required'] },
        description: {
            type: String,
            required: [true, 'Product description is required'],
        },
        price: { type: Number, required: [true, 'Product price is required'] },
        category: {
            type: String,
            required: [true, 'Product category is required'],
        },
        tags: { type: [String], required: [true, 'Product tags are required'] },
        variants: {
            type: [variantSchema],
            required: [true, 'Product variants are required'],
        },
        inventory: {
            type: inventorySchema,
            required: [true, 'Product inventory is required'],
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

// Middleware to exclude products that are marked as deleted from query results
productSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });

    next();
});
productSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });

    next();
});
// Middleware to exclude products that are marked as deleted from aggregate results
productSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

// Create and export the Product model based on the product schema
export const Product = model<IProduct, ProductModel>('Product', productSchema);
