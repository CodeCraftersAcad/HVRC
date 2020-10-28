import {
    GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAIL,
    CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL, CATEGORY_CREATE_RESET,
    DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL, CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_RESET, GET_ALL_SCALES_SUCCESS, GET_ALL_SCALES_REQUEST,
    GET_ALL_SCALES_FAIL, SCALE_UPDATE_REQUEST, SCALE_UPDATE_SUCCESS, SCALE_UPDATE_FAIL, SCALE_UPDATE_RESET, SCALE_CREATE_REQUEST, SCALE_CREATE_SUCCESS,
    SCALE_CREATE_FAIL, SCALE_CREATE_RESET, DELETE_SCALE_REQUEST, DELETE_SCALE_SUCCESS, DELETE_SCALE_FAIL, SCALE_DETAILS_REQUEST,
    SCALE_DETAILS_SUCCESS, SCALE_DETAILS_FAIL
} from "../constants/categories-constants";


export const categoryListReducer = (state = {categories: []}, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_REQUEST:
            return {loading: true, categories: []}
        case GET_ALL_CATEGORIES_SUCCESS:
            return {loading: false, categories: action.payload}
        case GET_ALL_CATEGORIES_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const categoryUpdateReducer = (state = {category: {}}, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return {loading: true, ...state}
        case CATEGORY_UPDATE_SUCCESS:
            return {loading: false, success: true, category: action.payload}
        case CATEGORY_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case CATEGORY_UPDATE_RESET:
            return {category: {}}
        default:
            return state
    }
}

export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return {loading: true}
        case CATEGORY_CREATE_SUCCESS:
            return {loading: false, success: true, category: action.payload}
        case CATEGORY_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case CATEGORY_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
            return {loading: true, ...state}
        case DELETE_CATEGORY_SUCCESS:
            return {loading: false, success: true}
        case DELETE_CATEGORY_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const scaleListReducer = (state = {scales: []}, action) => {
    switch (action.type) {
        case GET_ALL_SCALES_REQUEST:
            return {loading: true, scales: []}
        case GET_ALL_SCALES_SUCCESS:
            return {loading: false, scales: action.payload}
        case GET_ALL_SCALES_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const scaleDetailsReducer = (state = {scale: {}}, action) => {
    switch (action.type) {
        case SCALE_DETAILS_REQUEST:
            return {loading: true, ...state}
        case SCALE_DETAILS_SUCCESS:
            return {loading: false, scale: action.payload}
        case SCALE_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const scaleUpdateReducer = (state = {scale: {}}, action) => {
    switch (action.type) {
        case SCALE_UPDATE_REQUEST:
            return {loading: true, ...state}
        case SCALE_UPDATE_SUCCESS:
            return {loading: false, success: true, scale: action.payload}
        case SCALE_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case SCALE_UPDATE_RESET:
            return {
                scale: {}
            }
        default:
            return state
    }
}

export const scaleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SCALE_CREATE_REQUEST:
            return {loading: true}
        case SCALE_CREATE_SUCCESS:
            return {loading: false, success: true, scale: action.payload}
        case SCALE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case SCALE_CREATE_RESET:
            return {}
        default:
            return state
    }
}
export const scaleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SCALE_REQUEST:
            return {loading: true, ...state}
        case DELETE_SCALE_SUCCESS:
            return {loading: false, success: true}
        case DELETE_SCALE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}