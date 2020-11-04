import {
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    GET_ALL_SCALES_REQUEST,
    GET_ALL_SCALES_SUCCESS,
    GET_ALL_SCALES_FAIL,
    SCALE_CREATE_REQUEST,
    SCALE_CREATE_SUCCESS,
    SCALE_CREATE_FAIL,
    DELETE_SCALE_REQUEST,
    DELETE_SCALE_SUCCESS,
    DELETE_SCALE_FAIL,
    SCALE_UPDATE_REQUEST,
    SCALE_UPDATE_SUCCESS,
    SCALE_UPDATE_FAIL,
    SCALE_DETAILS_REQUEST,
    SCALE_DETAILS_SUCCESS,
    SCALE_DETAILS_FAIL,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    GET_ALL_BRANDS_REQUEST,
    GET_ALL_BRANDS_SUCCESS,
    GET_ALL_BRANDS_FAIL,
    BRAND_UPDATE_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,
    BRAND_CREATE_SUCCESS,
    BRAND_CREATE_FAIL,
    BRAND_UPDATE_SUCCESS,
    BRAND_UPDATE_FAIL,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAIL
} from "../constants/categories-constants";
import axios from "axios";
import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS} from "../constants/product-contstants";

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

export const adminCreateNewCategory = () => async (dispatch, getState) => {
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

        const {data} = await axios.post(`/api/categories`, {}, config)

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

export const adminUpdateSingleCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.put(`/api/categories/${category._id}`, category, config)

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: CATEGORY_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/categories/${id}`)

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
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

export const listScale = () => async (dispatch) => {
    try {
        dispatch({type: GET_ALL_SCALES_REQUEST})

        const {data} = await axios.get(`/api/scales`)

        dispatch({
            type: GET_ALL_SCALES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_SCALES_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listScaleDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: SCALE_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/scales/${id}`)

        dispatch({
            type: SCALE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SCALE_DETAILS_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminCreateNewScale = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SCALE_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.post(`/api/scales`, {}, config)

        dispatch({
            type: SCALE_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SCALE_CREATE_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminUpdateSingleScale = (scale) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SCALE_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.put(`/api/scales/${scale._id}`, scale, config)

        dispatch({
            type: SCALE_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SCALE_UPDATE_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminDeleteScaleById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_SCALE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/scales/${id}`, config)

        dispatch({type: DELETE_SCALE_SUCCESS})

    } catch (error) {
        dispatch({
            type: DELETE_SCALE_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listBrands = () => async (dispatch) => {
    try {
        dispatch({type: GET_ALL_BRANDS_REQUEST})

        const {data} = await axios.get(`/api/brands`)

        dispatch({
            type: GET_ALL_BRANDS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_BRANDS_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const brandDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: BRAND_UPDATE_REQUEST})

        const {data} = await axios.get(`/api/brands/${id}`)

        dispatch({
            type: BRAND_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BRAND_DETAILS_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminCreateNewBrand = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SCALE_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.post(`/api/brands`, {}, config)

        dispatch({
            type: BRAND_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BRAND_CREATE_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminUpdateSingleBrand = (brand) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BRAND_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.put(`/api/brands/${brand._id}`, brand, config)

        dispatch({
            type: BRAND_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BRAND_UPDATE_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminDeleteBrandById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_BRAND_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/brands/${id}`, config)

        dispatch({type: DELETE_BRAND_SUCCESS})

    } catch (error) {
        dispatch({
            type: DELETE_BRAND_FAIL,
            // error.response is the error from the server, error.response.data.message is the custom error from the backend when fetching a product
            // If their is a custom response we want to send that message to the component for viewing if not send the generic message.
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}