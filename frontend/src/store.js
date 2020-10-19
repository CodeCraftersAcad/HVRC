import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productListReducer, productDetailsReducer} from "./reducers/product-reducers";
import {cartReducer} from "./reducers/cart-reducers";
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateInfoReducer} from "./reducers/user-reducers";
import {orderCreateReducer} from "./reducers/order-reducers";


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateInfoReducer,
    orderCreate: orderCreateReducer
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const userAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const initialState = {
    cart: {cartItems: cartItemsFromLocalStorage, shippingAddress: userAddressFromStorage},
    userLogin: {userInfo: userInfoFromLocalStorage},
};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store