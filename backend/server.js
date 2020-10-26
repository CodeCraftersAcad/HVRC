import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path'
import colors from 'colors'
import cloudinary from 'cloudinary'

const cloud = cloudinary


dotenv.config();

// Custom imports
import connectDb from './config/db.js';
import productRoutes from './routes/product-routes.js';
import categoryRouters from './routes/category-routes.js'
import userRoutes from './routes/user-routes.js';
import orderRoutes from './routes/order-routes.js';
import uploadRoutes from './routes/upload-routes.js';
import {notFound, errorhandler} from "./middleware/errors.js";

const app = express();
app.use(express.json());
const env = app.get('env');
const PORT = process.env.PORT || 5000;

connectDb(env);

env === 'development' && app.use(morgan('dev'))

cloud.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/categories', categoryRouters)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

// Resolve __dirname since using es6 modules
const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
if (env === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}


app.use(notFound)
app.use(errorhandler)


app.get('/', (req, res) => {
    res.send('API is running')
})

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
})