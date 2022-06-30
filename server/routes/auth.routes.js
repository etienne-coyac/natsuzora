const express = require('express');
const router = express.Router();

const rootController = require('../controllers/auth.controller');

router.post('/register', rootController.register);
router.post('/login', rootController.authenticate);

module.exports = router;