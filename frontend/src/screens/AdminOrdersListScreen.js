import React, {useEffect} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/message";
import Loader from "../components/Loader";
import {listAllOrders} from "../actions/order-actions";

const AdminOrderListScreen = ({history, match}) => {
    const dispatch = useDispatch()

    const adminGetAllOrders = useSelector(state => state.adminGetAllOrders)
    const {loading, error, orders} = adminGetAllOrders

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {

        if (!userInfo.isAdmin) history.push('/login')

        dispatch(listAllOrders())

    }, [dispatch, history, userInfo])

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Orders</h1>
                </Col>
            </Row>

            {error && <Message variant='danger'>{error}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Paid</th>
                        <th>Shipped</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? (
                                order.paidAt.substring(0, 10)
                            ): (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>{order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                            ): (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='outline-dark' className='btn-sm'>
                                    Details
                                </Button>
                            </LinkContainer>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default AdminOrderListScreen;