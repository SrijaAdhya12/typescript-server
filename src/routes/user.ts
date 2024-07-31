import { createUser, getAllUsers, updateUser, } from "controllers/users"
import express from "express"
const router = express.Router();

router.route('/').get(getAllUsers).post(createUser)
router.route("/:id").put(updateUser)

export default router;