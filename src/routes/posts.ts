import { createPost, getAllPosts, updatePost } from "controllers/posts";
import express from "express"
const router = express.Router();

router.route('/').get(getAllPosts).post(createPost)
router.route('/:id').put(updatePost)

export default router;