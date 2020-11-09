import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container} from "react-bootstrap"
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderScreen";
import AdminUserListScreen from "./screens/AdminUserListScreen";
import AdminUserEditScreen from "./screens/AdminUserEditScreen";
import AdminProductListScreen from "./screens/AdminProductListScreen";
import AdminProductEditScreen from "./screens/AdminProductEditScreen";
import AdminOrderListScreen from "./screens/AdminOrdersListScreen";
import AdminCategoryListScreen from "./screens/AdminCategoryListScreen";
import AdminEditScaleScreen from "./screens/AdminEditScaleScreen";
import AdminEditCategoryScreen from "./screens/AdminEditCategoryScreen";
import AdminBrandEditScreen from "./screens/AdminBrandEditScreen";
import AdminColorEditScreen from "./screens/AdminColorEditScreen";
import CategoryScreen from "./screens/CategoryScreen";
import LandingScreen from "./screens/LandingScreen";
import CategoryNav from "./components/CategoryNav";
const App = () => {
    return (
        <Router>
            <Header/>
            <main className='py-4'>
                <Container>
                    <Route path='/admin/orderlist' component={AdminOrderListScreen} />
                    <Route path='/order/:id' component={OrderDetailsScreen} />
                    <Route path='/payment' component={PaymentMethodScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/admin/categorylist' component={AdminCategoryListScreen} exact/>
                    <Route path='/admin/scales/:id/edit' component={AdminEditScaleScreen} />
                    <Route path='/admin/categories/:id/edit' component={AdminEditCategoryScreen} />
                    <Route path='/admin/brands/:id/edit' component={AdminBrandEditScreen} />
                    <Route path='/admin/colors/:id/edit' component={AdminColorEditScreen} />
                    <Route path='/admin/userlist' component={AdminUserListScreen} />
                    <Route path='/admin/users/:id/edit' component={AdminUserEditScreen} />
                    <Route path='/admin/productlist' component={AdminProductListScreen} exact />
                    <Route path='/admin/productlist/:pageNumber' component={AdminProductListScreen} exact />
                    <Route path='/admin/product/:id/edit' component={AdminProductEditScreen} />
                    <Route path='/search/:keyword' component={HomeScreen} exact/>
                    <Route path='/category/:keyword' component={CategoryScreen} exact/>
                    <Route path='/page/:pageNumber' component={HomeScreen} exact />
                    <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
                    {/*<Route path='/products' component={HomeScreen} exact />*/}
                    <Route path='/' component={HomeScreen} exact />
                    {/*<Route path='/' component={LandingScreen} exact />*/}
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
