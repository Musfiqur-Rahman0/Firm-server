const prisma = require("../config/prisma");
const { paginatedResponse } = require("../utils/response");

exports.createPost = async (req, res) => {
  try {
    const { title, postContent, tags } = req.body;
    const userId = req.user.id;
    console.log(`Creating post for user ${userId} with title "${title}"`);
    const post = await prisma.communityPost.create({
      data: {
        userId,
        title,
        postContent,
        tags: tags || [],
      },
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    console.log(
      `Fetching posts - Page: ${page}, Limit: ${limit}, Skip: ${skip}`,
    );

    const posts = await prisma.communityPost.findMany({
      where: {
        isPublished: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: true,
      },
      orderBy: {
        postDate: "desc",
      },
      skip,
      take: limit,
    });

    const total = await prisma.communityPost.count({
      where: {
        isPublished: true,
      },
    });

    return paginatedResponse(res, "Posts fetched", posts, {
      page,
      limit,
      total,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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
            post: false,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updated = await prisma.communityPost.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({
      success: true,
      message: "Post updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await prisma.communityPost.delete({
      where: { id: req.params.id },
    });

    res.json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    const comment = await prisma.postComment.create({
      data: {
        postId,
        userId,
        content,
      },
    });

    res.status(201).json({
      success: true,
      message: "Comment added",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await prisma.postComment.findMany({
      where: {
        postId: req.params.postId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await prisma.communityPost.update({
      where: { id: req.params.id },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });

    res.json({
      success: true,
      message: "Post liked",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
