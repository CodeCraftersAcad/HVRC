import express from 'express';
import {
    loginUser,
    registerUser,
    getProfile,
    updateUser,
    getUsers,
    deleteUser,
    adminUpdateUser,
    adminGetUserDetailsById
} from "../controllers/user-controllers.js";
import {auth, isAdminCheck} from '../middleware/auth.js'

const router = express.Router();

/*
*  @desc:   GET all users as admin
*  @route:  GET /api/users/
*  @access: Private / Admin
*/
/*
*  @desc:   Register new user
*  @route:  POST /api/users/
*  @access: Public
*/
router.route('/').get(auth, isAdminCheck, getUsers).post(registerUser)

/*
*  @desc:   Auth user and gen token
*  @route:  POST /api/users/login
*  @access: Public
*/
router.route('/login').post(loginUser)


// Protect routes
router.use(auth)

/*
*  @desc:   GET user profile
*  @route:  GET /api/users/profile
*  @access: Private
*/
/*
*  @desc:   Update user profile
*  @route:  PUT /api/users/profile
*  @access: Private
*/
router.route('/profile').get(getProfile).put(updateUser)

/*
*  @desc:   Delete single user
*  @route:  DELETE /api/users/:id
*  @access: Private / Admin
*/
/*
*  @desc:   GET user details by id
*  @route:  GET /api/users/:id
*  @access: Private / Admin
*/
/*
*  @desc:   Update user profile
*  @route:  PUT /api/users/:id
*  @access: Private / Admin
*/
router.route('/:id').delete(isAdminCheck, deleteUser)
    .get(isAdminCheck, adminGetUserDetailsById).put(isAdminCheck, adminUpdateUser)

export default router;