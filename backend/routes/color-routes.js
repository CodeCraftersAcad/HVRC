import express from 'express'
const router = express.Router()

import {getColors, postNewColor, getSingleColor, updateColor, deleteColor} from "../controllers/color-controllers.js";
import {auth, isAdminCheck} from "../middleware/auth.js";


router.route('/').get(getColors).post(auth, isAdminCheck, postNewColor)
router.route('/:id').get(getSingleColor).put(auth, isAdminCheck, updateColor).delete(auth, isAdminCheck, deleteColor)

export default router;