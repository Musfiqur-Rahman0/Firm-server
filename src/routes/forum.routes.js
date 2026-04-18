const express = require('express');
const router = express.Router();

const forumController = require('../controllers/forum.controller');

console.log(' Forum routes loaded');

// Posts
router.post('/posts', forumController.createPost);
router.get('/posts', forumController.getPosts);
router.get('/posts/:id', forumController.getPost);
router.put('/posts/:id', forumController.updatePost);
router.delete('/posts/:id', forumController.deletePost);

// Comments
router.post('/comments', forumController.addComment);
router.get('/comments/:postId', forumController.getComments);

// Likes
router.put('/posts/:id/like', forumController.likePost);

module.exports = router;