import mongoose from 'mongoose';

const connectDb = async (env) => {
    try {
        if (env === 'development') {
            const conn = await mongoose.connect(process.env.MONGO_URL_DEV, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
            console.log(`High Voltage RC Development DB Connected: ${conn.connection.host}`.cyan.underline);
        } else if (env === 'production') {
            const conn = await mongoose.connect(process.env.MONGO_URL_PROD, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
            console.log(`High Voltage RC Production DB: ${conn.connection.host}`.cyan.underline);
        }
    } catch (err) {
        console.error(`Error: ${err.message}`.red.underline.bold)
        process.exit(1)
    }
};

export default connectDb;