import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/form-container";
import {saveAddress} from "../actions/cart-actions";
import CheckoutBreadcrumbs from "../components/CheckoutBreadcrumbs";

const ShippingScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [zipcode, setZipcode] = useState(shippingAddress.zipcode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitCheckout = (e) => {
        e.preventDefault()
        dispatch(saveAddress({address, city, zipcode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutBreadcrumbs step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitCheckout}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text'
                                  placeholder='Enter your address'
                                  value={address}
                                  required
                                  onChange={e => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text'
                                  placeholder='Enter your city'
                                  value={city}
                                  required
                                  onChange={e => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='zipcode'>
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type='text'
                                  placeholder='Enter your zipcode'
                                  value={zipcode}
                                  required
                                  onChange={e => setZipcode(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text'
                                  placeholder='Enter your country'
                                  value={country}
                                  required
                                  onChange={e => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='outline-dark'>Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;