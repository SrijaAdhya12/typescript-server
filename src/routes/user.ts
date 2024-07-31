import { createUser, getAllUsers,  }  from "controllers/users"
import express from "express"
const router = express.Router();

// Define route for getting all users
router.get('/', getAllUsers)
router.post("/", createUser)


export default router;