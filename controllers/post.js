const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    const { title, description, authorId } = req.body;
    const buildPost = await Post.create({ title, description, authorId });
    const post = await buildPost.save();
    return res.status(200).json({ post, status: "Success" });
  } catch (error) {
    throw error;
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll();
    return res.status(200).json({
      posts,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllPost, createPost };
