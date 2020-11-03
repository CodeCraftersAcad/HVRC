import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const ProductSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    additionalName: {
        type: String,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true
    },
    shippingTime: {
      type: String,
      required: false
    },
    image: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: false
    },
    image3: {
        type: String,
        required: false
    },
    image4: {
        type: String,
        required: false
    },
    image5: {
        type: String,
        required: false
    },
    // scale: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Scale',
    //     required: false
    // },
    scale: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productIdNumber: {
        type: String,
        required: false
    },
    weight: {
        type: String,
        required: false
    },
    subCategory: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    powerType: {
        type: String,
        required: false,
        default: 'Electric'
    },
    motor: {
        type: String,
        required: false
    },
    transmitter: {
        type: String,
        required: false
    },
    other: {
        type: String,
        required: false,
    },
    dimensions: {
        type: String,
        required: false,
    },
    battery: {
        type: String,
        required: false
    },
    includesAdditional: {
        type: String,
        required: false
    },
    sku: {
        type: String,
        required: false
    },
    discountable: {
        type: Boolean,
        required: false,
        default: false
    },
    colors: {
        type: String,
        required: false
    },
    chosenColor: {
        type: String,
        required: false
    }
}, {timestamps: true})

const Product = mongoose.model('Product', ProductSchema);

export default Product;