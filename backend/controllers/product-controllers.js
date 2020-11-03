import asyncHandler from "express-async-handler";
import Product from '../models/Product.js'


/*
*  @desc:   Get all products
*  @route:  GET /api/products/
*  @access: Public
*/
const getAllProducts = asyncHandler(async (req, res) => {
    // Pagination set number for pagination
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    // Query for keyword in the url or set it to empty object
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    // Get total count of products
    const count = await Product.countDocuments({...keyword})

    // When looking for keyword value use the spread in the find so that it wil either match the value or pass an
    // empty object and retrieve all products
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    res.json({products, page, pages: Math.ceil(count / pageSize)})
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
        productIdNumber: '',
        weight: '',
        subCategory: 'Rc',
        user: req.user._id,
        image: '/images/sample.jpg',
        // image2: '',
        // image3: '',
        // image4: '',
        // image5: '',
        brand: 'Sample Brand',
        category: 'Sample Category',
        scale: '',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample something nice',
        additionalName: 'Products name additional details',
        powerType: '',
        motor: '',
        transmitter: '',
        other: '',
        dimensions: '',
        battery: '',
        includesAdditional: '',
        sku: '',
        discountable: false,
        colors: '',
        shippingCost: 0,
        shippingTime: '',
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
    const {
        name, additionalName, price, description, image, image2, image3, image4, image5, brand, category,
        countInStock, powerType, motor, transmitter, other, dimensions, battery, includesAdditional, sku,
        discountable, productIdNumber, weight, subCategory, scale, colors, shippingCost, shippingTime
    } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.additionalName = additionalName
        product.price = price
        product.description = description
        product.image = image
        product.shippingCost = shippingCost
        product.shippingTime = shippingTime
        // product.image2 = image2
        // product.image3 = image3
        // product.image4 = image4
        // product.image5 = image5
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.powerType = powerType
        product.motor = motor
        product.transmitter = transmitter
        product.other = other
        product.dimensions = dimensions
        product.battery = battery
        product.includesAdditional = includesAdditional
        product.sku = sku
        product.discountable = discountable
        product.productIdNumber = productIdNumber
        product.weight = weight
        product.subCategory = subCategory
        product.scale = scale
        product.colors = colors

        const updatedProduct = await product.save()
        console.log(updatedProduct)
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

/*
*  @desc:   Get top rated products
*  @route:  GET /api/products/top
*  @access: Public
*/
const getBestReviewedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(products)
})

export {
    getAllProducts,
    getSingleProduct,
    deleteSingleProduct,
    createMewProduct,
    updateProduct,
    createNewReview,
    getBestReviewedProducts
}