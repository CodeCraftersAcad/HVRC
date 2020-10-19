import React, {useState} from 'react';
import {Form, Button, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/form-container";
import {savePaymentMethod} from "../actions/cart-actions";
import CheckoutBreadcrumbs from "../components/CheckoutBreadcrumbs";

const PaymentMethodScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if (!shippingAddress) history.push('/shipping')

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitCheckout = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutBreadcrumbs step1 step2 step3/>
            <h2>Payment Method</h2>
            <Form onSubmit={submitCheckout}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method of Payment
                    </Form.Label>
                <Col>
                    <Form.Check type='radio'
                                label='PayPal or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={e => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                    {/*<Form.Check type='radio'*/}
                    {/*            label='Stripe'*/}
                    {/*            id='Stripe'*/}
                    {/*            name='paymentMethod'*/}
                    {/*            value='Stripe'*/}
                    {/*            onChange={e => setPaymentMethod(e.target.value)}>*/}
                    {/*</Form.Check>*/}
                </Col>
                </Form.Group>
                <Button type='submit' variant='outline-dark'>Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentMethodScreen;