import {
    GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAIL, CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL
} from "../constants/categories-constants";
import axios from "axios";

export const listCategories = () => async (dispatch) => {
    try {
        dispatch({type: GET_ALL_CATEGORIES_REQUEST})

        const {data} = await axios.get(`/api/categories`)

        dispatch({
            type: GET_ALL_CATEGORIES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_CATEGORIES_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminCreateNewCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.post(`/api/categories`, category, config)

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminDeleteCategoryById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_CATEGORY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/categories/${id}`, config)

        dispatch({type: DELETE_CATEGORY_SUCCESS})

    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}