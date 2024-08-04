import { createUser, deleteUser, getAllUsers, getUserById, patchUser, updateUser, } from "controllers/users"
import express from "express"
const router = express.Router();

router.route('/').get(getAllUsers).post(createUser)
router.route("/:id").get(getUserById).put(updateUser).patch(patchUser).delete(deleteUser)

export default router;