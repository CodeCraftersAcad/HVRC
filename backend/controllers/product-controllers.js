import asyncHandler from "express-async-handler";
import Product from '../models/Product.js'


/*
*  @desc:   Get all products
*  @route:  GET /api/products/
*  @access: Public
*/
const getAllProducts = asyncHandler(async (req, res) => {
    // Query for keyword in the url or set it to empty object
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    // When looking for keyword value use the spread in the find so that it wil either match the value or pass an
    // empty object and retrieve all products
    const products = await Product.find({...keyword})
    res.json(products)
})

/*
*  @desc:   Get single product
*  @route:  GET /api/products/:id
*  @access: Public
*/
const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) res.json(product)
    else {
        res.status(404);
        throw new Error('Product not found')
    }
})

/*
*  @desc:   Delete single product
*  @route:  DELETE /api/products/:id
*  @access: Private / Admin
*/
const deleteSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({message: 'Product Deleted'})
    } else {
        res.status(404);
        throw new Error('Product not found')
    }
})

/*
*  @desc:   Create create product
*  @route:  POST /api/products/
*  @access: Private / Admin
*/
const createMewProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample something nice'
    })

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)
})

/*
*  @desc:   Update update single product
*  @route:  PUT /api/products/:id
*  @access: Private / Admin
*/
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.orice = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

/*
*  @desc:   Create new review
*  @route:  POST /api/products/:id/reviews
*  @access: Private
*/
const createNewReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({message: 'Thank you for your review'})

            } else {
        res.status(404)
        throw new Error('Product Not Found')
    }


})

export {
    getAllProducts,
    getSingleProduct,
    deleteSingleProduct,
    createMewProduct,
    updateProduct,
    createNewReview
}