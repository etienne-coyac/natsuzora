const { check } = require('express-validator');

const registerValidate = [
    check('username').trim().escape(),
    check('email', 'Invalid email address.').isEmail(),
    check('password').trim().escape()
];

module.exports = { registerValidate }