import { createUser, deleteUser, getAllUsers, updateUser, } from "controllers/users"
import express from "express"
const router = express.Router();

router.route('/').get(getAllUsers).post(createUser)
router.route("/:id").put(updateUser)
router.route("/:id").delete(deleteUser)

export default router;