const express = require('express');
const router = express.Router();

const rootController = require('../controllers/auth.controller');
const validator = require('./validators/auth.validator')

router.post('/register', validator.registerValidate, rootController.register);
router.post('/refresh_token', rootController.refreshToken);
router.post('/login', rootController.authenticate);

module.exports = router;