import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        maxLength: 32
    }
}, {timestamps: true})

const Brand = mongoose.model('Brand', BrandSchema);

export default Brand;