import axios from 'axios';
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cart-constants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            image: data.image,
            product: data._id,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}