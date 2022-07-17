const { check } = require('express-validator');

const seasonValidate = [
    check('year').trim().escape(),
    check('season').trim().escape()
];

const uuidValidate = [
    check('uuid').trim().escape(),
];

module.exports = { seasonValidate, uuidValidate }