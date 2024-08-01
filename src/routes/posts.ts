import { getAllPosts } from "controllers/posts";
import express from "express"
const router = express.Router();

router.route('/').get(getAllPosts)

export default router;