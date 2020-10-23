import express from 'express';
import {generateOrder, getUserOrderById, updateOrderStatus, getUsersOrders, getAllOrders, updateOrderShippingStatus} from "../controllers/order-controllers.js";
import {auth, isAdminCheck} from '../middleware/auth.js'

const router = express.Router();
// Protect routes
router.use(auth)

/*
*  @desc:   Create new order
*  @route:  POST /api/orders/
*  @access: Private
*/
/*
*  @desc:   Get all orders
*  @route:  GET /api/orders
*  @access: Private / Admin
*/
router.route('/').post(generateOrder).get(isAdminCheck, getAllOrders)

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

/*
*  @desc:   Update order delivery status
*  @route:  PUT /api/orders/:id/deliver
*  @access: Private / Admin
*/
router.route('/:id/deliver').put(isAdminCheck, updateOrderShippingStatus)



export default router;