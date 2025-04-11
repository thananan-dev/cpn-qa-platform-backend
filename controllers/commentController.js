const commentServices = require("../services/commentServices");
const userServices = require("../services/userServices");
const postServices = require("../services/postServices");

const status = require("../constants/status");
const messages = require("../common/messages");
const handleRequestUtils = require("../utils/handleRequestUtils");
const { sequelize } = require("../config/database");

const getAllComments = async (_, res) => {
  try {
    const comments = await commentServices.getAllComments();

    if (!comments) {
      return res.status(404).json({
        status: status.FAILED,
        messages: "Comments not found",
      });
    }

    return res.status(200).json({
      status: status.SUCCESS,
      comments,
    });
  } catch (error) {
    return res.status(500).json({ status: status.FAILED, error });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await commentServices.getCommentById(id);

    if (!comment) {
      return res.status(404).json({
        status: status.FAILED,
        messages: "Comment not found",
      });
    }

    return res.status(200).json({
      status: status.SUCCESS,
      comment,
    });
  } catch (error) {
    return res.status(500).json({ status: status.FAILED, error });
  }
};

const createComment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { comment, userId, postId } = req.body;

    if (handleRequestUtils.handleRequestInvalidBody(comment, userId, postId)) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: messages.InvalidRequest });
    }

    const isExistUserId = await userServices.getUserById(userId);
    const isExistPostId = await postServices.getPostById(postId);

    if (!isExistUserId) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: "User not found" });
    }

    if (!isExistPostId) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: "Post not found" });
    }

    const commentData = await commentServices.createComment(
      comment,
      userId,
      postId
    );

    transaction.commit()
    return res
      .status(200)
      .json({ status: status.SUCCESS, comment: commentData });
  } catch (error) {
    transaction.rollback()
    return res.status(500).json({ status: status.FAILED, error });
  }
};

const updateComment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (handleRequestUtils.handleRequestInvalidBody(comment)) {
      return res
        .status(400)
        .json({ status: status.FAILED, message: messages.InvalidRequest });
    }

    const isExistComment = await commentServices.getCommentById(id);

    if(!isExistComment){
      return res
        .status(400)
        .json({ status: status.FAILED, message: "Comment not found" });
    }

    const commentData = await commentServices.updateComment(id, comment);

    transaction.commit()
    return res
      .status(200)
      .json({ status: status.SUCCESS, comment: commentData });
  } catch (error) {
    transaction.rollback()
    return res.status(500).json({ status: status.FAILED, error });
  }
};

const deleteComment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;

    const isExistComment = await commentServices.getCommentById(id);

    if(!isExistComment){
      return res
        .status(400)
        .json({ status: status.FAILED, message: "Comment not found" });
    }

    const commentData = await commentServices.deleteComment(id);

    transaction.commit()
    return res
      .status(200)
      .json({ status: status.SUCCESS, comment: commentData });
  } catch (error) {
    transaction.rollback()
    return res.status(500).json({ status: status.FAILED, error });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};
