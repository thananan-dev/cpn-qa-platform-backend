const express = require('express');
const router = express.Router();

const authenticateController = require('../controllers/authenticationController')

router.post('/login', authenticateController.login)
router.post('/register', authenticateController.register)

module.exports = router;
