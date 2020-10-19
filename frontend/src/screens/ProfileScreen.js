import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import {getUserDetails, updateUserDetails} from "../actions/user-actions";



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

    const userUpdates = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdates;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) dispatch(getUserDetails('profile'))
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitRegister = e => {
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
            <Form onSubmit={submitRegister}>
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
                <Button type='submit' variant='outline-primary'>Save</Button>
            </Form>
        </Col>

        <Col md={9}>
            <h3>My orders</h3>
        </Col>
    </Row>
};

export default ProfileScreen;