import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        maxLength: 32
    }
}, {timestamps: true})

const Category = mongoose.model('Category', CategorySchema);

export default Category;