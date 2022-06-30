const authService = require('../services/auth.service');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports.register = async (req, res) => {
    let result = await authService.register(req.body.username, req.body.email, req.body.password);
    if (result.error) { res.status(401).send(result) }
    else { res.status(200).send(result) }
}

module.exports.authenticate = async (req, res) => {
    let result = await authService.authenticate(req.body.username, req.body.password);
    if (result.error) { res.status(401).send(result) }
    else { res.status(200).send(result) }
}