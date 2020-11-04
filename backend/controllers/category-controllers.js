import asyncHandler from "express-async-handler";
import Categories from '../models/Categories.js';

const getCategories = asyncHandler(async (req, res) => {
    let categories = await Categories.find()
    if (!categories) {
        res.status(400)
        throw new Error('No categories found')
    }
    res.send(categories)
})

const postNewCategory = asyncHandler(async (req, res) => {
    let category = await Categories.create({name: 'Sample Category'})
    res.status(201).json(category)
})

const updateCategory = asyncHandler(async (req, res) => {
    let category = await Categories.findById(req.params.id)
    category.name = req.body.name || category.name
    if (!category) {
        res.status(400)
        throw new Error('Category not found')
    }
    let updatedCategory = await category.save()
    res.json(updatedCategory)
})

const getSingleCategory = asyncHandler(async (req, res) => {
    let category = await Categories.findById(req.params.id)
    if (!category) {
        res.status(400)
        throw new Error('Category not found')
    }
    res.json(category)
})

const deleteCategory = asyncHandler(async (req, res) => {
    let category = await Categories.findById(req.params.id)
    let deletedCategory = await category.remove()
    res.json(deletedCategory)
})



export {
    getCategories,
    postNewCategory,
    updateCategory,
    getSingleCategory,
    deleteCategory,
}