import express from 'express';
import dotenv from 'dotenv';
dotenv.config() // should call before ontop of using any env variable
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
const port = process.env.PORT || 5000;

connectDB(); //Connect to MongoDB

const app = express();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cookie parser middleware
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('API is running....')
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is running on port ${port}`))