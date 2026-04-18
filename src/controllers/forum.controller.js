const prisma = require('../config/prisma');

exports.createPost = async (req, res) => {
  try {
    const {
      userId,
      title,
      postContent,
      tags
    } = req.body;

    const post = await prisma.communityPost.create({
      data: {
        userId,
        title,
        postContent,
        tags: tags || []
      }
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.communityPost.findMany({
      where: {
        isPublished: true
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        },
        comments: true
      },
      orderBy: {
        postDate: 'desc'
      }
    });

    res.json({
      success: true,
      data: posts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await prisma.communityPost.findUnique({
      where: { id: req.params.id },
      include: {
        user: true,
        comments: {
          include: {
            post: false
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    res.json({
      success: true,
      data: post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updated = await prisma.communityPost.update({
      where: { id: req.params.id },
      data: req.body
    });

    res.json({
      success: true,
      message: "Post updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await prisma.communityPost.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: "Post deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const {
      postId,
      userId,
      content
    } = req.body;

    const comment = await prisma.postComment.create({
      data: {
        postId,
        userId,
        content
      }
    });

    res.status(201).json({
      success: true,
      message: "Comment added",
      data: comment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await prisma.postComment.findMany({
      where: {
        postId: req.params.postId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: comments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await prisma.communityPost.update({
      where: { id: req.params.id },
      data: {
        likesCount: {
          increment: 1
        }
      }
    });

    res.json({
      success: true,
      message: "Post liked",
      data: post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};