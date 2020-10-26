import express from 'express'
import {getCategories, postNewCategory, getSingleCategory, updateCategory, deleteCategory} from "../controllers/category-controllers.js";
import {auth, isAdminCheck} from "../middleware/auth.js";

const router = express.Router()


router.route('/').get(getCategories).post( postNewCategory)
router.route('/:id').get(getSingleCategory).put(auth, isAdminCheck, updateCategory).delete(auth, isAdminCheck, deleteCategory)

export default router;