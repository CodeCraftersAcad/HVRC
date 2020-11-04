import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        maxLength: 32
    },
}, {timestamps: true})

const Color = mongoose.model('Color', ColorSchema);

export default Color;
