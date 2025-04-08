const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.get('/user/getAllUser', userController.getAllUser)
router.post('/user/createUser', userController.createUser)

module.exports = router;
