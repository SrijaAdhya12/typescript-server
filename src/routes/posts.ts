import { createPost, deletePost, getAllPosts, patchPost, updatePost } from "controllers/posts";
import express from "express"
const router = express.Router();

router.route('/').get(getAllPosts).post(createPost)
router.route('/:id').put(updatePost).patch(patchPost).delete(deletePost)

export default router;