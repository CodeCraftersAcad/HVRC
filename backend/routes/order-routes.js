import express from 'express';
import {generateOrder, getUserOrderById, updateOrderStatus, getUsersOrders} from "../controllers/order-controllers.js";
import {auth} from '../middleware/auth.js'

const router = express.Router();
// Protect routes
router.use(auth)

/*
*  @desc:   Create new order
*  @route:  POST /api/orders/
*  @access: Private
*/
router.route('/').post(generateOrder)

/*
*  @desc:   Get logged in users order
*  @route:  GET /api/orders/myorders
*  @access: Private
*/
router.route('/myorders').get(getUsersOrders)

/*
*  @desc:   Get order by id
*  @route:  GET /api/orders/:id
*  @access: Private
*/
router.route('/:id').get(getUserOrderById)

/*
*  @desc:   Update order payment status
*  @route:  GET /api/orders/:id/pay
*  @access: Private
*/
router.route('/:id/pay').put(updateOrderStatus)




export default router;