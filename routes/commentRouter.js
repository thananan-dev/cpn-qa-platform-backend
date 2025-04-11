const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController')

router.get('/getAll', commentController.getAllComments)
router.get('/get/:id', commentController.getCommentById)
router.post('/create', commentController.createComment)
router.patch('/update/:id', commentController.updateComment)
router.delete('/delete/:id', commentController.deleteComment)

module.exports = router;
