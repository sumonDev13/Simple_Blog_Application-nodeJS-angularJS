import * as blogStore from "../models/blogStore.js";
import StatusCodes from 'http-status-codes';

export const createPost = (req, res, next) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            const error = new Error('Title, content, and author are required');
            error.statusCode = 400;
            throw error;
        }
        const newPost = blogStore.createPost(title, content, author);
        res.status(201).json({
            statusCode:StatusCodes.CREATED,
            message: 'Post created successfully',
            post: newPost
        });
    } catch (error) {
        next(error);
    }
};

export const getAllPosts = (req, res, next) => {
    try {
        const posts = blogStore.getAllPosts();
        res.json({
            statusCode:StatusCodes.OK,
            message: 'Get all posts successfully',
            post: posts
        });
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
        res.json({
            statusCode:StatusCodes.OK,
            message: 'Found the post successfully',
            post: post
        });
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
        res.json({
            statusCode:StatusCodes.OK,
            message: 'Post updated successfully',
            post: updatePost
        });
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
        res.status(200).json({
            statusCode:StatusCodes.OK,
            message: 'Post deleted successfully',
            post: deleted
        });
    } catch (error) {
        next(error);
    }
};
