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
        throw new Error("Invalid email or password")
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
*  @desc:   Get user profile
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

/*
*  @desc:   Update user profile
*  @route:  PUT /api/users/profile
*  @access: Private
*/
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) user.password = req.body.password

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: genJWTToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

/*
*  @desc:   GET all users as admin
*  @route:  GET /api/users/
*  @access: Private / Admin
*/
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

/*
*  @desc:   Delete single user
*  @route:  DELETE /api/users/:id
*  @access: Private / Admin
*/
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove();
        res.json({message: 'User deleted'})
    } else {
        res.status(404)
        throw new Error('User not found ')
    }
})

/*
*  @desc:   GET user details by id
*  @route:  GET /api/users/:id
*  @access: Private / Admin
*/
const adminGetUserDetailsById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) res.json(user)
    else {
        res.status(404)
        throw new Error('User not found ')
    }
})

/*
*  @desc:   Update user profile
*  @route:  PUT /api/users/:id
*  @access: Private / Admin
*/
const adminUpdateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    loginUser,
    registerUser,
    getProfile,
    updateUser,
    getUsers,
    deleteUser,
    adminGetUserDetailsById,
    adminUpdateUser
}