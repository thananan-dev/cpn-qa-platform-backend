const express = require('express');
const router = express.Router();

const authenticateController = require('../controllers/authentication')

router.get('/auth', authenticateController.login)

module.exports = router;
