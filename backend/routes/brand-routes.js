import express from 'express'
const router = express.Router()

import {deleteBrand, getBrands, getSingleBrand, postNewBrand, updateBrand} from "../controllers/brand-controllers.js";
import {auth, isAdminCheck} from "../middleware/auth.js";


router.route('/').get(getBrands).post(auth, isAdminCheck, postNewBrand)
router.route('/:id').get(getSingleBrand).put(auth, isAdminCheck, updateBrand).delete(auth, isAdminCheck, deleteBrand)

export default router;