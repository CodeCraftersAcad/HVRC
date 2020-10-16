import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors'


dotenv.config();

// Custom imports
import connectDb from './config/db.js';
import productRoutes from './routes/product-routes.js';
import {notFound, errorhandler} from "./middleware/errors.js";

const app = express();
const env = app.get('env');
const PORT = process.env.PORT || 5000;

connectDb(env);

app.use(morgan('dev'));

app.use('/api/products', productRoutes);

app.use(notFound)

app.use(errorhandler)


app.get('/', (req, res) => {
    res.send('API is running')
})

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
})