import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// error route
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.get('/', (req: Request, res: Response) => {
    res.send('root route');
});

export default app;
