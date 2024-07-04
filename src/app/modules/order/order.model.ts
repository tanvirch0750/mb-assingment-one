import { Schema, model } from 'mongoose';
import { IOrder, IOrderMethods, OrderModel } from './order.interface';

const orderSchema = new Schema<IOrder, OrderModel, IOrderMethods>(
    {
        email: { type: String, required: [true, 'Customer email is required'] },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product description is required'],
        },
        price: { type: Number, required: [true, 'Product price is required'] },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required'],
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

// query middleware - to remove that is isDeleted true
orderSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });

    next();
});
orderSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });

    next();
});
// aggregate middleware - to remove that is isDeleted true- if used aggreagate instead of findOne
orderSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
