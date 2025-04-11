const postServices = require("../services/postServices");
const userServices = require("../services/userServices");

const status = require("../constants/status");
const messages = require("../common/messages");
const handleRequestUtils = require("../utils/handleRequestUtils");
const { sequelize } = require("../config/database");

const getAllPosts = async (req, res) => {
  try {
    const posts = await postServices.getAllPosts();

    if (!posts) {
      return res.status(404).json({
        status: status.FAILED,
        messages: "Posts not found",
      });
    }

    return res.status(200).json({
      status: status.SUCCESS,
      posts,
    });
  } catch (error) {
    return res.status(500).json({ status: status.FAILED, error });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postServices.getPostById(id);

    if (!post) {
      return res.status(404).json({
        status: status.FAILED,
        messages: "Post not found",
      });
    }

    return res.status(200).json({
      status: status.SUCCESS,
      post,
    });
  } catch (error) {
    return res.status(500).json({ status: status.FAILED, error });
  }
};

const createPost = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { title, description, userId } = req.body;

    if (
      handleRequestUtils.handleRequestInvalidBody(title, description, userId)
    ) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: messages.InvalidRequest });
    }

    const isExistUserId = await userServices.getUserById(userId);

    if (!isExistUserId) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: "User not found" });
    }

    const post = await postServices.createPost(title, description, userId);

    transaction.commit();
    return res.status(200).json({ post, status: status.SUCCESS, post });
  } catch (error) {
    transaction.rollback();
    return res.status(500).json({ status: status.FAILED, error });
  }
};

const updatePost = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (handleRequestUtils.handleRequestInvalidBody(title, description)) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: messages.InvalidRequest });
    }

    const isExistPost = await postServices.getPostById(id);

    if (!isExistPost) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: "Post not found" });
    }

    const postData = await postServices.updatePost(id, title, description);

    transaction.commit();
    return res.status(200).json({ status: status.SUCCESS, post: postData });
  } catch (error) {
    console.log({ error });
    transaction.rollback();
    return res.status(500).json({ status: status.FAILED, error });
  }
};

const deletePost = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;

    const isExistPost = await postServices.getPostById(id);

    if (!isExistPost) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: "Post not found" });
    }

    const postData = await postServices.deletePost(id);

    transaction.commit();
    return res
      .status(200)
      .json({ status: status.SUCCESS, post: postData });
  } catch (error) {
    console.log({ error });
    transaction.rollback();
    return res.status(500).json({ status: status.FAILED, error });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
