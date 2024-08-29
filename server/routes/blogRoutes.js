import express from 'express';
import * as blogController from "../controller/blogController.js"

const router = express.Router();

router.post('/', blogController.createPost);
router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPost);
router.put('/:id', blogController.updatePost);
router.delete('/:id', blogController.deletePost);

export default router;