import posts from '../models/posts';
import { Post } from "../models/posts"
import express from "express"

const fetchAllPosts = (): Post[] => {
    return posts;
};


// Get Post by Id

export const getUserById = (req: express.Request, res: express.Response): void => {
    try {
        const postId = parseInt(req.params.id, 10);

        if (isNaN(postId)) {
            res.status(400).json({ message: 'Invalid user ID' });
            return;
        }

        const post = posts.find(post => post.id === postId);

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error find post', error: error.message });
    }
};


// Get all posts
export const getAllPosts = (req: express.Request, res: express.Response): void => {
    try {
        const posts: Post[] = fetchAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};


// Create post

const generateUniqueId = (): number => {
    let id: number;
    do {
        id = Math.floor(Math.random() * 1000);
    } while (posts.some(post => post.id === id));
    return id;
};

export const createPost = (req: express.Request, res: express.Response): void => {
    try {
        const { post, createdBy } = req.body as { post: string, createdBy: number };
        const newPostId = generateUniqueId();
        const newPost: Post = {
            id: newPostId,
            post,
            createdBy
        };

        posts.push(newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

// export const createPost = (req: express.Request, res: express.Response): void => {
//     try {
//         const { id, post, createdBy } = req.body as { id: number, post: string, createdBy: number };
//         const newPost: Post = { id, post, createdBy };
//         posts.push(newPost);
//         res.status(201).json(newPost);
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ message: 'Error creating user' });
//     }
// };

// update a post
export const updatePost = (req: express.Request, res: express.Response): void => {
    try {
        const postId = parseInt(req.params.id, 10);
        const { post: newPostContent } = req.body;

        if (isNaN(postId)) {
            res.status(400).json({ message: 'Invalid post ID' });
            return;
        }

        const postIndex = posts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        const updatedPost: Post = {
            ...posts[postIndex],
            post: newPostContent ?? posts[postIndex].post
        };

        posts[postIndex] = updatedPost;

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

// patch a post

export const patchPost = (req: express.Request, res: express.Response): void => {
    try {
        const postId = parseInt(req.params.id, 10);
        const { post: newPostContent } = req.body;

        if (isNaN(postId)) {
            res.status(400).json({ message: 'Invalid post ID' });
            return;
        }

        const postIndex = posts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        const currentPost = posts[postIndex];

        const updatedPost: Post = {
            ...currentPost,
            post: newPostContent ?? currentPost.post
        };

        posts[postIndex] = updatedPost;

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

// delete an post
export const deletePost = (req: express.Request, res: express.Response): void => {
    try {
        const postId = parseInt(req.params.id, 10);
        const userIndex = posts.findIndex(post => post.id === postId);
        if (userIndex === -1) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const deletedUser = posts[userIndex];

        posts.splice(userIndex, 1);

        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
}