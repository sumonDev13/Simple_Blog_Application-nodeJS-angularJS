import { dummyPosts } from "../data/dummyData.js";

let blogPosts = [];
let nextId = 1;

export const initializeStore = () => {
    blogPosts = [...dummyPosts];
    nextId = Math.max(...blogPosts.map(post => post.id)) + 1;
    console.log(`Blog store initialized with ${blogPosts.length} posts. Next ID: ${nextId}`);
};

export const createPost = (title, content, author) => {
    const newPost = {
        id: nextId++,
        title,
        content,
        author,
        created_at: new Date().toISOString()
    };
    blogPosts.push(newPost);
    return newPost;
};

export const getAllPosts = () => {
    return blogPosts;
};

export const getPost = (id) => {
    return blogPosts.find(post => post.id === id);
};

export const updatePost = (id, { title, content, author }) => {
    const post = blogPosts.find(post => post.id === id);
    if (!post) return null;
    
    if (title) post.title = title;
    if (content) post.content = content;
    if (author) post.author = author;
    
    return post;
};

export const deletePost = (id) => {
    const index = blogPosts.findIndex(post => post.id === id);
    if (index === -1) return false;
    
    blogPosts.splice(index, 1);
    return true;
};
