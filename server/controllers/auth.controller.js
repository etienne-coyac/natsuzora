const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports.register = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(422).send({ error: err.array() })
    }
    let result = await authService.register(req.body.username, req.body.email, req.body.password);
    if (result.error) { res.status(401).send(result); }
    else { res.status(200).send(result) }
}

module.exports.authenticate = async (req, res) => {
    let result = await authService.authenticate(req.body.username, req.body.password);
    if (result.error) { res.status(401).send({ auth: false }); }
    else {
        const token = authService.generateAccessToken(result.user);
        const refresh_token = authService.generateRefreshToken(result.user);
        res.status(200).send({ auth: true, token: token, refreshToken: refresh_token, result: result.user });
    }
}

module.exports.refreshToken = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, user) => {
        if (err) return res.sendStatus(401);

        const valid_user = await authService.verifyUserRefreshToken(user);

        if (valid_user) {
            const new_token = authService.generateAccessToken(valid_user);
            res.status(200).send({ auth: true, token: new_token, result: valid_user });
        }
        else {
            return res.sendStatus(401);
        }
    });
}