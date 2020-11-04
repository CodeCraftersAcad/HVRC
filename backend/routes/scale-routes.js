import express from 'express'
const router = express.Router()

import {deleteScale, getScales, getSingleScale, postNewScale, updateScale} from "../controllers/scale-controllers.js";
import {auth, isAdminCheck} from "../middleware/auth.js";


router.route('/').get(getScales).post(auth, isAdminCheck, postNewScale)
router.route('/:id').get(getSingleScale).put(auth, isAdminCheck, updateScale).delete(auth, isAdminCheck, deleteScale)

export default router;