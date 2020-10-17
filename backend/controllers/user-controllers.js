import asyncHandler from "express-async-handler";
import User from '../models/User.js'
import genJWTToken from "../../utils/genJWT.js";


/*
*  @desc:   Auth user and gen token
*  @route:  POST /api/users/login
*  @access: Public
*/
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genJWTToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

/*
*  @desc:   Register new user
*  @route:  POST /api/users/
*  @access: Public
*/
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    const existingUser = await User.findOne({email})
 if (existingUser) {
     res.status(400)
     throw new Error('Account already exists with that email')
 }

 const user = await User.create({
     name,
     email,
     password
 })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genJWTToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user information')
    }
})

/*
*  @desc:   GET user profile
*  @route:  GET /api/users/profile
*  @access: Private
*/
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    loginUser,
    registerUser,
    getProfile
}