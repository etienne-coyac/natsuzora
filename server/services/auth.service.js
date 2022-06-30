const uuid = require('uuid');
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
    if (user.length > 0) {
        let a = bcrypt.compare(password, user[0].password, (err, result) => {
            console.log(result)
            return result ? result : { error: 'Wrong username/password combination' };
        })
        console.log(a)
    }
    return { error: 'User doesn\'t exists' };
}

module.exports = { register, authenticate };