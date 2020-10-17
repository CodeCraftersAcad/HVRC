import express from 'express';
import {getAllProducts, getSingleProduct} from "../controllers/product-controllers.js";

const router = express.Router();

/*
*  @desc:   Fetch all products
*  @route:  GET /api/products/
*  @access: Public
*/
router.route('/').get(getAllProducts)

/*
*  @desc:   Fetch single product
*  @route:  GET /api/products/:id
*  @access: Public
*/
router.route('/:id').get(getSingleProduct)

export default router