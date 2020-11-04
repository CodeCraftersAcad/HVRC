import {
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_RESET,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,
    GET_ALL_SCALES_SUCCESS,
    GET_ALL_SCALES_REQUEST,
    GET_ALL_SCALES_FAIL,
    SCALE_UPDATE_REQUEST,
    SCALE_UPDATE_SUCCESS,
    SCALE_UPDATE_FAIL,
    SCALE_UPDATE_RESET,
    SCALE_CREATE_REQUEST,
    SCALE_CREATE_SUCCESS,
    SCALE_CREATE_FAIL,
    SCALE_CREATE_RESET,
    DELETE_SCALE_REQUEST,
    DELETE_SCALE_SUCCESS,
    DELETE_SCALE_FAIL,
    SCALE_DETAILS_REQUEST,
    SCALE_DETAILS_SUCCESS,
    SCALE_DETAILS_FAIL,
    DELETE_SCALE_RESET,
    DELETE_CATEGORY_RESET,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    GET_ALL_BRANDS_REQUEST,
    GET_ALL_BRANDS_SUCCESS,
    GET_ALL_BRANDS_FAIL,
    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,
    BRAND_UPDATE_REQUEST,
    BRAND_UPDATE_SUCCESS,
    BRAND_UPDATE_FAIL,
    BRAND_UPDATE_RESET,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAIL,
    DELETE_BRAND_RESET,
    BRAND_CREATE_REQUEST,
    BRAND_CREATE_SUCCESS,
    BRAND_CREATE_FAIL,
    BRAND_CREATE_RESET,
    GET_ALL_COLORS_REQUEST,
    GET_ALL_COLORS_SUCCESS,
    GET_ALL_COLORS_FAIL,
    COLOR_DETAILS_SUCCESS,
    COLOR_DETAILS_FAIL,
    UPDATE_COLOR_REQUEST,
    UPDATE_COLOR_SUCCESS,
    UPDATE_COLOR_FAIL,
    UPDATE_COLOR_RESET,
    CREATE_COLOR_REQUEST,
    CREATE_COLOR_SUCCESS,
    CREATE_COLOR_FAIL,
    CREATE_COLOR_RESET,
    DELETE_COLOR_REQUEST,
    DELETE_COLOR_SUCCESS,
    DELETE_COLOR_FAIL,
    DELETE_COLOR_RESET, COLOR_DETAILS_REQUEST
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

export const categoryDetailsReducer = (state = {category: {}}, action) => {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return {loading: true, ...state}
        case CATEGORY_DETAILS_SUCCESS:
            return {loading: false, category: action.payload}
        case CATEGORY_DETAILS_FAIL:
            return {loading: false, error: action.payload}
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
        case DELETE_CATEGORY_RESET:
            return {}
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
        case DELETE_SCALE_RESET:
            return {}
        default:
            return state
    }
}

export const brandListReducer = (state = {brands: []}, action) => {
    switch (action.type) {
        case GET_ALL_BRANDS_REQUEST:
            return {loading: true, brands: []}
        case GET_ALL_BRANDS_SUCCESS:
            return {loading: false, brands: action.payload}
        case GET_ALL_BRANDS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const brandDetailsReducer = (state = {brand: {}}, action) => {
    switch (action.type) {
        case BRAND_DETAILS_REQUEST:
            return {loading: true, ...state}
        case BRAND_DETAILS_SUCCESS:
            return {loading: false, brand: action.payload}
        case BRAND_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const brandUpdateReducer = (state = {brand: {}}, action) => {
    switch (action.type) {
        case BRAND_UPDATE_REQUEST:
            return {loading: true, ...state}
        case BRAND_UPDATE_SUCCESS:
            return {loading: false, success: true, brand: action.payload}
        case BRAND_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case BRAND_UPDATE_RESET:
            return {
                brand: {}
            }
        default:
            return state
    }
}

export const brandCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BRAND_CREATE_REQUEST:
            return {loading: true}
        case BRAND_CREATE_SUCCESS:
            return {loading: false, success: true, brand: action.payload}
        case BRAND_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case BRAND_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const brandDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_BRAND_REQUEST:
            return {loading: true, ...state}
        case DELETE_BRAND_SUCCESS:
            return {loading: false, success: true}
        case DELETE_BRAND_FAIL:
            return {loading: false, error: action.payload}
        case DELETE_BRAND_RESET:
            return {}
        default:
            return state
    }
}

export const colorListReducer = (state = {colors: []}, action) => {
    switch (action.type) {
        case GET_ALL_COLORS_REQUEST:
            return {loading: true, colors: []}
        case GET_ALL_COLORS_SUCCESS:
            return {loading: false, colors: action.payload}
        case GET_ALL_COLORS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const colorDetailsReducer = (state = {color: {}}, action) => {
    switch (action.type) {
        case COLOR_DETAILS_REQUEST:
            return {loading: true, ...state}
        case COLOR_DETAILS_SUCCESS:
            return {loading: false, color: action.payload}
        case COLOR_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const colorUpdateReducer = (state = {color: {}}, action) => {
    switch (action.type) {
        case UPDATE_COLOR_REQUEST:
            return {loading: true, ...state}
        case UPDATE_COLOR_SUCCESS:
            return {loading: false, success: true, color: action.payload}
        case UPDATE_COLOR_FAIL:
            return {loading: false, error: action.payload}
        case UPDATE_COLOR_RESET:
            return {color: {}}
        default:
            return state
    }
}

export const colorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_COLOR_REQUEST:
            return {loading: true}
        case CREATE_COLOR_SUCCESS:
            return {loading: false, success: true, color: action.payload}
        case CREATE_COLOR_FAIL:
            return {loading: false, error: action.payload}
        case CREATE_COLOR_RESET:
            return {}
        default:
            return state
    }
}

export const colorDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_COLOR_REQUEST:
            return {loading: true, ...state}
        case DELETE_COLOR_SUCCESS:
            return {loading: false, success: true}
        case DELETE_COLOR_FAIL:
            return {loading: false, error: action.payload}
        case DELETE_COLOR_RESET:
            return {}
        default:
            return state
    }
}