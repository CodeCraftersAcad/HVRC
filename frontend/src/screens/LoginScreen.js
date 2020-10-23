import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/message";
import Loader from "../components/Loader";
import {login} from "../actions/user-actions";
import FormContainer from "../components/form-container";


const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const {loading, error, userInfo} = userLogin;

    const redirect = location.search
        ? location.search.split('=')[1]
        : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitLogin = e => {
        e.preventDefault()
        // dispatch login
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Login</h1>
            {error && <Message variant='danger'>{error}</Message> }
            {loading && <Loader/>}
            <Form onSubmit={submitLogin}>
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
                <Button type='submit' variant='outline-primary'>Login</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New user? {' '}
                    <Link to={redirect
                        ? `/register?redirect=${redirect}`
                        : '/register'}>
                        Register here
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;