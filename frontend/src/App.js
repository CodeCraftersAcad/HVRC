import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap"
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

const App = () => {
    return (
        <Router>
            <Header/>
            <main className='py-4'>
                <Container>
                    <Route path='/payment' component={PaymentMethodScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
