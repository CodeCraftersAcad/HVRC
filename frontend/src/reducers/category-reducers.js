import {GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAIL,
CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL, CATEGORY_CREATE_RESET,
    DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL} from "../constants/categories-constants";


export const categoryListReducer = (state = {categories:[]}, action) => {
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