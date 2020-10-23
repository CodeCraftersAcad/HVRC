import {
    USER_UPDATE_INFO_REQUEST,
    USER_UPDATE_INFO_SUCCESS,
    USER_UPDATE_INFO_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
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
    ADMIN_SAVE_USER_INFO_RESET,
} from "../constants/user-constants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userDetailsReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {...state, loading: true}
        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload}
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        case USER_DETAILS_RESET:
            return {user: {}}
        default:
            return state
    }
}

export const userUpdateInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_INFO_REQUEST:
            return {...state, loading: true}
        case USER_UPDATE_INFO_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload}
        case USER_UPDATE_INFO_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const adminUserListReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case ADMIN_USER_LIST_REQUEST:
            return {loading: true}
        case ADMIN_USER_LIST_SUCCESS:
            return {loading: false, users: action.payload}
        case ADMIN_USER_LIST_FAIL:
            return {loading: false, error: action.payload}
        case ADMIN_USER_LIST_RESET:
            return {user: []}
        default:
            return state
    }
}

export const adminUserDeleteReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case ADMIN_DELETE_USER_REQUEST:
            return {loading: true}
        case ADMIN_DELETE_USER_SUCCESS:
            return {loading: false, success: true}
        case ADMIN_DELETE_USER_FAIL:
            return {loading: false, error: action.payload}
        case ADMIN_USER_LIST_RESET:
            return {user: []}
        default:
            return state
    }
}

export const adminUserUpdateReducer = (state = {users: {}}, action) => {
    switch (action.type) {
        case ADMIN_SAVE_USER_INFO_REQUEST:
            return {loading: true}
        case ADMIN_SAVE_USER_INFO_SUCCESS:
            return {loading: false, success: true}
        case ADMIN_SAVE_USER_INFO_FAIL:
            return {loading: false, error: action.payload}
        case ADMIN_SAVE_USER_INFO_RESET:
            return {user: {}}
        default:
            return state
    }
}