const Comment = require("../models/commentModel");

const getAllComments = async () => {
  const comments = await Comment.findAll();
  return comments;
};

const getCommentById = async (id) => {
  const comment = await Comment.findOne({
    where: {
      id,
    },
  });

  return comment;
};

const createComment = async (comment, userId, postId) => {
  const buildComment = await Comment.create({ comment, userId, postId });
  const saveComment = await buildComment.save();
  
  return saveComment;
};

const updateComment = async (commentId, comment) => {
  const updateComment = await Comment.update({
    comment,
  }, {
    where: {
        id: commentId
    }
  });

  return updateComment;
};

const deleteComment = async (commentId) => {
    const deleteComment = await Comment.destroy({
        where: {
            id: commentId
        }
      });
  
    return deleteComment;
  };

module.exports = { getAllComments, getCommentById, createComment, updateComment, deleteComment };
