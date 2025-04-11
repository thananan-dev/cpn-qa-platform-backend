const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const getAllPosts = async () => {
  const posts = await Post.findAll();
  return posts;
};

const getPostById = async (id) => {
  const post = await Post.findOne({
    where: { id },
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "createdAt", "updatedAt"],
        include: [{ model: User, attributes: ["firstName", "lastName"] }],
      },
    ],
  });
  
  return post;
};

const createPost = async (title, description, userId) => {
  const buildPost = await Post.create({ title, description, userId });
  const post = await buildPost.save();

  return post;
};

const updatePost = async (id, title, description) => {
  const post = await Post.update({ title, description }, { where: { id } });
  return post;
};

const deletePost = async (id) => {
  const post = await Post.destroy({ where: { id } });
  return post;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
