import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ScaleSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        maxLength: 32
    },
}, {timestamps: true})

const Scale = mongoose.model('Scale', ScaleSchema);

export default Scale;