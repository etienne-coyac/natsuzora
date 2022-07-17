const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authDal = require('../dal/auth.dal');

async function register(username, email, password) {
    let id = uuid.v4().toString();
    return bcrypt.hash(password, 10).then(async function (hash) {
        return await authDal.register(id, username, email, hash);
    })
}

async function authenticate(username, password) {
    let user = await authDal.getUser(username);
    if (user.length === 1) {
        return bcrypt.compare(password, user[0].password).then(function (result) {
            if (result) {
                delete user[0].password;
                return { login: true, user: user[0] };
            }
            return { login: false, error: 'Wrong user/password combination.' }
        });
    }
    return { login: false, error: 'User doesn\'t exists.' };
}

async function verifyUserRefreshToken(user) {
    let db_user = await authDal.getUser(user.username);
    if (db_user.length === 1 && db_user[0].role === user.role) {
        db_user = db_user[0];
        delete db_user.password;
        return db_user;
    }
    return false;
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1500s',
    });
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = { register, authenticate, generateAccessToken, generateRefreshToken, verifyUserRefreshToken };