import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/message";
import Loader from "../components/Loader";
import {getUserDetails, updateUserDetails} from "../actions/user-actions";
import {listUsersOrders} from "../actions/order-actions";
import {USER_UPDATE_INFO_RESET} from "../constants/user-constants";


const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;

    const userOrders = useSelector(state => state.userOrders);
    const {orders, error: errorOrders, loading: userOrdersLoading} = userOrders;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({type: USER_UPDATE_INFO_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listUsersOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, user, userInfo, success])

    const submitUserUpdate = e => {
        e.preventDefault()

        if (password !== confirmedPassword) {
            setMessage('Passwords do not match')
        } else {
            // dispatch update user
            dispatch(updateUserDetails({id: user._id, name, email, password}))
        }
    }

    return <Row>
        <Col md={3}>
            <h2>Profile</h2>
            {message && <Message variant='info'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>User information updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitUserUpdate}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text'
                                  placeholder='Enter your name'
                                  value={name}
                                  onChange={e => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email'
                                  placeholder='Enter your account email'
                                  value={email}
                                  onChange={e => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                                  placeholder='Enter your account password'
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmedPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password'
                                  placeholder='Enter your password again'
                                  value={confirmedPassword}
                                  onChange={e => setConfirmedPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='outline-primary'>Update</Button>
            </Form>
        </Col>

        <Col md={9}>
            <h3>My orders</h3>
            {userOrdersLoading ? <Loader/> : error ? <Message variant='danger'>{errorOrders}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                   <th>ID</th>
                   <th>DATE</th>
                   <th>TOTAL</th>
                   <th>PAID</th>
                   <th>DELIVERED</th>
                   <th>DETAILS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn' variant='outline-dark'>Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
};

export default ProfileScreen;