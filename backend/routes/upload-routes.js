import path from 'path'
import express from 'express'
import multer from 'multer'
import asyncHandler from "express-async-handler";


const router = express.Router()
import cloudinary from 'cloudinary'

const cloud = cloudinary

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})

router.post('/', upload.single('image'), asyncHandler (async (req, res) => {
    const uploadPhoto = await cloud.uploader.upload(`${req.file.path}`)
    res.send(uploadPhoto.url)
}))

router.post('/photo2', upload.single('image'), asyncHandler (async (req, res) => {
    const uploadPhoto = await cloud.uploader.upload(`${req.file.path}`)
    res.send(uploadPhoto.url)
}))

router.post('/photo3', upload.single('image'), asyncHandler (async (req, res) => {
    const uploadPhoto = await cloud.uploader.upload(`${req.file.path}`)
    res.send(uploadPhoto.url)
}))

router.post('/photo4', upload.single('image'), asyncHandler (async (req, res) => {
    const uploadPhoto = await cloud.uploader.upload(`${req.file.path}`)
    res.send(uploadPhoto.url)
}))

router.post('/photo5', upload.single('image'), asyncHandler (async (req, res) => {
    const uploadPhoto = await cloud.uploader.upload(`${req.file.path}`)
    res.send(uploadPhoto.url)
}))

export default router