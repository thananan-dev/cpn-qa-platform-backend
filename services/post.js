const express = require('express');
const router = express.Router();

const postController = require('../controllers/post')

router.get('/user/getAllPost', postController.getAllPost)
router.post('/user/createPost', postController.createPost)

module.exports = router;
