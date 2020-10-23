import express from 'express';
import {
    getAllProducts,
    getSingleProduct,
    deleteSingleProduct,
    createMewProduct,
    updateProduct,
    createNewReview,
    getBestReviewedProducts
} from "../controllers/product-controllers.js";
import {isAdminCheck, auth} from "../middleware/auth.js";

const router = express.Router();

/*
*  @desc:   Fetch all products
*  @route:  GET /api/products/
*  @access: Public
*/
router.route('/').get(getAllProducts).post(auth, isAdminCheck, createMewProduct)

/*
*  @desc:   Fetch single product
*  @route:  GET /api/products/:id
*  @access: Public
*/

/*
*  @desc:   Create new review
*  @route:  POST /api/products/:id/reviews
*  @access: Private
*/
router.route('/:id/reviews').post(auth, createNewReview)

/*
*  @desc:   Get top rated products
*  @route:  GET /api/products/top
*  @access: Public
*/
router.route('/top').get(getBestReviewedProducts)
/*
*  @desc:   Delete single product
*  @route:  DELETE /api/products/:id
*  @access: Private / Admin
*/
router.route('/:id').get(getSingleProduct)
    .delete(auth, isAdminCheck, deleteSingleProduct)
    .put(auth, isAdminCheck, updateProduct)


export default router