import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_RESET,
    PRODUCT_GET_BEST_PRODUCTS_REQUEST,
    PRODUCT_GET_BEST_PRODUCTS_SUCCESS,
    PRODUCT_GET_BEST_PRODUCTS_FAIL,
    PRODUCTS_BY_CATEGORY_REQUEST,
    PRODUCTS_BY_CATEGORY_SUCCESS,
    PRODUCTS_BY_CATEGORY_FAIL,
} from "../constants/product-contstants";

export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload.products, pages: action.payload.pages, page: action.payload.page}
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productDetailsReducer = (state = {product: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, ...state}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true, ...state}
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading: true, ...state}
        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true, ...state}
        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_UPDATE_RESET:
            return {product: {}}
        default:
            return state
    }
}

export const productReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST:
            return {loading: true, ...state}
        case PRODUCT_REVIEW_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_REVIEW_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_REVIEW_RESET: {
            return {}
        }
        default:
            return state
    }
}

export const productBestRatedReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_GET_BEST_PRODUCTS_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_GET_BEST_PRODUCTS_SUCCESS:
            return {loading: false, products: action.payload}
        case PRODUCT_GET_BEST_PRODUCTS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productByCategoryReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCTS_BY_CATEGORY_REQUEST:
            return {loading: true, products: []}
        case PRODUCTS_BY_CATEGORY_SUCCESS:
            return {loading: false, products: action.payload}
        case PRODUCTS_BY_CATEGORY_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}