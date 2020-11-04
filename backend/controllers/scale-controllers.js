import asyncHandler from "express-async-handler";
import Scale from "../models/Scale.js";
import Product from "../models/Product.js";

const getScales = asyncHandler(async (req, res) => {
    let categories = await Scale.find()
    if (!categories) {
        res.status(400)
        throw new Error('No categories found')
    }
    res.send(categories)
})

const getSingleScale = asyncHandler(async (req, res) => {
    let category = await Scale.findById(req.params.id)
    if (!category) {
        res.status(400)
        throw new Error('Category not found')
    }
    res.json(category)
})

const postNewScale = asyncHandler(async (req, res) => {
    const scale = new Scale({
        name: 'Sample Scale'
    })
    let createScale = await scale.save()

    res.status(201).json(createScale)
})

const updateScale = asyncHandler(async (req, res) => {
    let scale = await Scale.findById(req.params.id)
    scale.name = req.body.name || scale.name
    if (!scale) {
        res.status(400)
        throw new Error('Category not found')
    }
    let updatedScale = await scale.save()
    res.json(updatedScale)
})

const deleteScale = asyncHandler(async (req, res) => {
    let category = await Scale.findById(req.params.id)
    let deletedCategory = await category.remove()
    res.json(deletedCategory)
})

export {
    getScales,
    getSingleScale,
    postNewScale,
    updateScale,
    deleteScale
}