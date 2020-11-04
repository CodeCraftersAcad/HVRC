import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    categoryListReducer,
    categoryDeleteReducer,
    categoryCreateReducer,
    categoryUpdateReducer,
    scaleCreateReducer,
    scaleListReducer,
    scaleUpdateReducer,
    scaleDeleteReducer,
    scaleDetailsReducer,
    categoryDetailsReducer,
    brandListReducer,
    brandDeleteReducer,
    brandCreateReducer,
    brandUpdateReducer,
    brandDetailsReducer
} from "./reducers/category-reducers";
import {
    productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer,
    productReviewReducer, productBestRatedReducer
} from "./reducers/product-reducers";
import {cartReducer} from "./reducers/cart-reducers";
import {
    userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateInfoReducer, adminUserListReducer,
    adminUserDeleteReducer, adminUserUpdateReducer,
} from "./reducers/user-reducers";
import {
    orderCreateReducer, orderDetailsReducer, orderPayReducer, usersOrdersReducer, adminGetAllOrdersReducer,
    orderDeliveryReducer
} from "./reducers/order-reducers";


const reducer = combineReducers({
    getBrands: brandListReducer,
    listBrandDetails: brandDetailsReducer,
    createBrand: brandCreateReducer,
    updateBrand: brandUpdateReducer,
    deleteBrand: brandDeleteReducer,
    updateCategory: categoryUpdateReducer,
    getCategories: categoryListReducer,
    createCategory: categoryCreateReducer,
    categoryDetails: categoryDetailsReducer,
    deleteCategory: categoryDeleteReducer,
    updateScale: scaleUpdateReducer,
    getScales: scaleListReducer,
    scaleDetails: scaleDetailsReducer,
    createScale: scaleCreateReducer,
    deleteScale: scaleDeleteReducer,
    adminGetAllOrders: adminGetAllOrdersReducer,
    adminCreateProduct: productCreateReducer,
    adminProductUpdate: productUpdateReducer,
    productReview: productReviewReducer,
    productTopRated: productBestRatedReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    adminDeleteProduct: productDeleteReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateInfoReducer,
    userOrders: usersOrdersReducer,
    adminUserList: adminUserListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPayDetails: orderPayReducer,
    orderDeliveryDetails: orderDeliveryReducer,
    deleteUser: adminUserDeleteReducer,
    adminUpdatedUser: adminUserUpdateReducer
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