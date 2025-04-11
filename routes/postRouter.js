const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController')

router.get('/getAll', postController.getAllPosts)
router.get('/get/:id', postController.getPostById)
router.post('/create', postController.createPost)
router.patch('/update/:id', postController.updatePost)
router.delete('/delete/:id', postController.deletePost)


module.exports = router;
