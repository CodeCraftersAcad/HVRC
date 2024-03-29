import asyncHandler from "express-async-handler";
import Order from '../models/Order.js'

/*
*  @desc:   Create new order
*  @route:  POST /api/orders/
*  @access: Private
*/
const generateOrder = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No items in order')
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const orderCreated = await order.save()
        console.log(orderCreated)
        res.status(201).json(orderCreated)
    }
})

/*
*  @desc:   Get order by id
*  @route:  GET /api/orders/:id
*  @access: Private
*/
const getUserOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/*
*  @desc:   Update order payment status
*  @route:  GET /api/orders/:id/pay
*  @access: Private
*/
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/*
*  @desc:   Update order delivery status
*  @route:  PUT /api/orders/:id/deliver
*  @access: Private / Admin
*/
const updateOrderShippingStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/*
*  @desc:   Get logged in users order
*  @route:  GET /api/orders/myorders
*  @access: Private
*/
const getUsersOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.json(orders)
})

/*
*  @desc:   Get all orders
*  @route:  GET /api/orders
*  @access: Private / Admin
*/
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'id name');
    res.json(orders)
})

export {
    generateOrder,
    getUserOrderById,
    updateOrderStatus,
    getUsersOrders,
    getAllOrders,
    updateOrderShippingStatus
}