import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_INFO_FAIL,
    USER_UPDATE_INFO_REQUEST,
    USER_UPDATE_INFO_SUCCESS,
    USER_DETAILS_RESET,
    ADMIN_USER_LIST_REQUEST,
    ADMIN_USER_LIST_SUCCESS,
    ADMIN_USER_LIST_FAIL,
    ADMIN_USER_LIST_RESET,
    ADMIN_DELETE_USER_REQUEST,
    ADMIN_DELETE_USER_SUCCESS,
    ADMIN_DELETE_USER_FAIL,
    ADMIN_SAVE_USER_INFO_REQUEST,
    ADMIN_SAVE_USER_INFO_SUCCESS,
    ADMIN_SAVE_USER_INFO_FAIL,
} from "../constants/user-constants";
import axios from 'axios'
import {ORDER_MY_ORDER_LIST_RESET} from "../constants/order-constatns";

export const login = (email, password) =>  async dispatch => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const {data} = await axios.post('/api/users/login', {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_LOGOUT})
    dispatch({type: ADMIN_USER_LIST_RESET})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_MY_ORDER_LIST_RESET})
}

export const register = (name, email, password) =>  async dispatch => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const {data} = await axios.post('/api/users', {name, email, password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = (id) =>  async (dispatch, getState) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }}

        const {data} = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserDetails = (user) =>  async (dispatch, getState) => {
    try {
        dispatch({type: USER_UPDATE_INFO_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }}

        const {data} = await axios.put(`/api/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_INFO_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_INFO_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminListUsers = () =>  async (dispatch, getState) => {
    try {
        dispatch({type: ADMIN_USER_LIST_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {headers: {Authorization: `Bearer ${userInfo.token}`}}

        const {data} = await axios.get(`/api/users`, config)

        dispatch({
            type: ADMIN_USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_USER_LIST_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminDeleteUser = (id) =>  async (dispatch, getState) => {
    try {
        dispatch({type: ADMIN_DELETE_USER_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {headers: {Authorization: `Bearer ${userInfo.token}`}}

        await axios.delete(`/api/users/${id}`, config)

        dispatch({type: ADMIN_DELETE_USER_SUCCESS})

    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_USER_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminUpdateUser = (user) =>  async (dispatch, getState) => {
    try {
        dispatch({type: ADMIN_SAVE_USER_INFO_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }}

        const {data} = await axios.put(`/api/users/${user._id}`, user, config)

        dispatch({type: ADMIN_SAVE_USER_INFO_SUCCESS})
        dispatch({type: USER_DETAILS_SUCCESS, payload: data})


    } catch (error) {
        dispatch({
            type: ADMIN_SAVE_USER_INFO_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}