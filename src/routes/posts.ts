import { createPost, deletePost, getAllPosts, updatePost } from "controllers/posts";
import express from "express"
const router = express.Router();

router.route('/').get(getAllPosts).post(createPost)
router.route('/:id').put(updatePost).delete(deletePost)

export default router;