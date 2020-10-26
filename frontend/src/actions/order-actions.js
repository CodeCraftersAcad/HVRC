import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_MY_ORDER_LIST_REQUEST,
    ORDER_MY_ORDER_LIST_SUCCESS,
    ORDER_MY_ORDER_LIST_FAIL,
    ORDER_ADMIN_GET_ALL_ORDERS_REQUEST,
    ORDER_ADMIN_GET_ALL_ORDERS_SUCCESS,
    ORDER_ADMIN_GET_ALL_ORDERS_FAIL,
    ORDER_DELIVERY_STATUS_UPDATE_REQUEST,
    ORDER_DELIVERY_STATUS_UPDATE_SUCCESS,
    ORDER_DELIVERY_STATUS_UPDATE_FAIL
} from "../constants/order-constatns";
import axios from "axios";
import {CART_CLEAR_ITEMS} from "../constants/cart-constants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.get(`/api/orders/${orderId}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (orderId, orderPaymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.put(`/api/orders/${orderId}/pay`, orderPaymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listUsersOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_MY_ORDER_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: ORDER_MY_ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_MY_ORDER_LIST_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ADMIN_GET_ALL_ORDERS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.get(`/api/orders/`, config)

        dispatch({
            type: ORDER_ADMIN_GET_ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_ADMIN_GET_ALL_ORDERS_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVERY_STATUS_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch({
            type: ORDER_DELIVERY_STATUS_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DELIVERY_STATUS_UPDATE_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}