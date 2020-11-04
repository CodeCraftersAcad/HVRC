import asyncHandler from "express-async-handler";
import Color from "../models/Color.js";

const getColors = asyncHandler(async (req, res) => {
    let categories = await Color.find()
    if (!categories) {
        res.status(400)
        throw new Error('No colors found')
    }
    res.send(categories)
})

const getSingleColor = asyncHandler(async (req, res) => {
    let category = await Color.findById(req.params.id)
    if (!category) {
        res.status(400)
        throw new Error('Category not found')
    }
    res.json(category)
})

const postNewColor = asyncHandler(async (req, res) => {
    const color = new Color({
        name: 'Sample Color'
    })
    let createColor = await color.save()

    res.status(201).json(createColor)
})

const updateColor = asyncHandler(async (req, res) => {
    let color = await Color.findById(req.params.id)
    color.name = req.body.name || color.name
    if (!color) {
        res.status(400)
        throw new Error('Category not found')
    }
    let updatedColor = await color.save()
    res.json(updatedColor)
})

const deleteColor = asyncHandler(async (req, res) => {
    let color = await Color.findById(req.params.id)
    let deletedColor = await color.remove()
    res.json(deletedColor)
})

export {
    getColors,
    getSingleColor,
    postNewColor,
    updateColor,
    deleteColor
}