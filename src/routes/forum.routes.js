const express = require("express");
const router = express.Router();

const forumController = require("../controllers/forum.controller");
const { authenticate } = require("../middlewares/auth");

console.log(" Forum routes loaded");

// Posts
router.post("/posts", authenticate, forumController.createPost);
router.get("/posts", forumController.getPosts);
router.get("/posts/:id", forumController.getPost);
router.put("/posts/:id", authenticate, forumController.updatePost);
router.delete("/posts/:id", authenticate, forumController.deletePost);

// Comments
router.post("/comments", forumController.addComment);
router.get("/comments/:postId", forumController.getComments);

// Likes
router.put("/posts/:id/like", authenticate, forumController.likePost);

module.exports = router;
