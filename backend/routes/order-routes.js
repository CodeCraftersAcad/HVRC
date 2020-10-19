import express from 'express';
import {generateOrder} from "../controllers/order-controllers.js";
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


export default router;