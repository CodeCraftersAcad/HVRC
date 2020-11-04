import asyncHandler from "express-async-handler";
import Brand from "../models/Brand.js";

const getBrands = asyncHandler(async (req, res) => {
    let brands = await Brand.find()
    if (!brands) {
        res.status(400)
        throw new Error('No categories found')
    }
    res.send(brands)
})

const getSingleBrand = asyncHandler(async (req, res) => {
    let brand = await Brand.findById(req.params.id)
    if (!brand) {
        res.status(400)
        throw new Error('Category not found')
    }
    res.json(brand)
})

const postNewBrand = asyncHandler(async (req, res) => {
    const brand = new Brand({
        name: 'Sample Brand'
    })
    let createBrand = await brand.save()

    res.status(201).json(createBrand)
})

const updateBrand = asyncHandler(async (req, res) => {
    let brand = await Brand.findById(req.params.id)
    brand.name = req.body.name || brand.name
    if (!brand) {
        res.status(400)
        throw new Error('Brand not found')
    }
    let updateBrand = await brand.save()
    res.json(updateBrand)
})

const deleteBrand = asyncHandler(async (req, res) => {
    let brand = await Brand.findById(req.params.id)
    let deletedBrand = await brand.remove()
    res.json(deletedBrand)
})

export {
    getBrands,
    getSingleBrand,
    postNewBrand,
    updateBrand,
    deleteBrand
}