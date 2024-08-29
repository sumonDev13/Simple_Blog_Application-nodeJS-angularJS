import * as blogStore from "../models/blogStore.js";

export const createPost = (req, res, next) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            const error = new Error('Title, content, and author are required');
            error.statusCode = 400;
            throw error;
        }
        const newPost = blogStore.createPost(title, content, author);
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};

export const getAllPosts = (req, res, next) => {
    try {
        const posts = blogStore.getAllPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

export const getPost = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const post = blogStore.getPost(id);
        if (!post) {
            const error = new Error('Blog post not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(post);
    } catch (error) {
        next(error);
    }
};

export const updatePost = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { title, content, author } = req.body;
        const updatedPost = blogStore.updatePost(id, { title, content, author });
        if (!updatedPost) {
            const error = new Error('Blog post not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(updatedPost);
    } catch (error) {
        next(error);
    }
};

export const deletePost = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = blogStore.deletePost(id);
        if (!deleted) {
            const error = new Error('Blog post not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
