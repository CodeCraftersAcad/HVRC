import React, {useEffect, useState} from 'react';
import {Row, Col, ListGroup, Image, Card, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/message";
import {getOrderDetails, payOrder, deliverOrder} from "../actions/order-actions";
import Loader from "../components/Loader";
import {Link} from "react-router-dom";
import axios from 'axios'
import {PayPalButton} from "react-paypal-button-v2";
import {ORDER_PAY_RESET, ORDER_DELIVERY_STATUS_UPDATE_RESET} from "../constants/order-constatns";


const OrderDetailsScreen = ({match, history}) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [sdkReady, setSdkReady] = useState(false)


    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails;

    const orderPay = useSelector(state => state.orderPayDetails)
    const {loading: loadingPay, success: successPay} = orderPay;

    const orderDeliveryDetails = useSelector(state => state.orderDeliveryDetails)
    const {loading: loadingDeliver, success: successDeliver} = orderDeliveryDetails;

    if (!loading) {
        const addDeci = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        // Calc total price of cart
        order.itemsPrice = addDeci(order.orderItems.reduce((acc, item) => acc + item.price.toFixed(2) * item.quantity, 0).toFixed(2))
    }

    useEffect(() => {
        if (!userInfo) history.push('/login')
        const paypalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver) {
            // if (!order || order._id !== orderId) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVERY_STATUS_UPDATE_RESET})
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                paypalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo])

    const successfulPayment = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const setShipped = () => {
        dispatch(deliverOrder(order))
    }

    return loading
        ? <Loader/>
        : error
            ? <Message variant='danger'>{error}</Message>
            : <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>Shipping</h3>
                                <p><strong>Name:</strong> {order.user.name} {' '}</p>
                                <p><strong>Email:</strong> {order.user.email}</p>
                                <p><strong>Address</strong></p>
                                {order.shippingAddress.address}
                                {' '} {order.shippingAddress.city} {order.shippingAddress.zipcode}, {' '}
                                {order.shippingAddress.country}
                                {order.isDelivered ?
                                    <Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                                    <Message variant='warning'>Not Delivered</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>Payment Method</h3>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                                    <Message variant='warning'>Not Paid</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>Items</h3>
                                {order.orderItems.length === 0 ? <Message>Your order is empty</Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>Order Summary</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader/>}
                                        {!sdkReady ? <Loader/> : (
                                            <PayPalButton amount={order.totalPrice}
                                                          onSuccess={successfulPayment}/>
                                        )}
                                    </ListGroup.Item>
                                )}
                                {loadingDeliver && <Loader/>}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button'
                                                className='btn btn-block'
                                                variant='outline-dark'
                                                onClick={setShipped}>
                                            Mark as shipped
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
};

export default OrderDetailsScreen;