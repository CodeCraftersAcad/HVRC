import express from 'express';
import {loginUser, registerUser, getProfile} from "../controllers/user-controllers.js";
import {auth} from '../middleware/auth.js'

const router = express.Router();

/*
*  @desc:   Register new user
*  @route:  POST /api/users/
*  @access: Public
*/
router.route('/').post(registerUser)

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
router.route('/profile').get(getProfile)

export default router;