import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/message";
import Loader from "../components/Loader";
import {register} from "../actions/user-actions";
import FormContainer from "../components/form-container";


const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const {loading, error, userInfo} = userRegister;

    const redirect = location.search
        ? location.search.split('=')[1]
        : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitRegister = e => {
        e.preventDefault()

        if (password !== confirmedPassword) {
            setMessage('Passwords do not match')
        } else {
            // dispatch register
            dispatch(register(name, email, password))
            // dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='info'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                <Button type='submit' variant='outline-primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account? {' '}
                    <Link to={redirect
                        ? `/register?redirect=${redirect}`
                        : '/login'}>
                        Login here
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;