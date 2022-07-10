const db = require('./pool.dal');
const authService = require('../services/auth.service');

async function getUser(login) {
    let selectRequest = 'SELECT * FROM users WHERE username=$1';
    let result = await db.query(selectRequest, [login])
        .catch(errSQL => { console.error(errSQL.stack); return { rows: [] }; });
    if (result.rows.length === 0) {
        return false;
    }
    else {
        return result.rows;
    }
}

async function register(uuid, username, email, password) {

    let insertRequest = 'INSERT INTO users (uuid, username, email, password, role) VALUES ($1,$2,$3,$4,$5)';
    let result = await db.query(insertRequest, [uuid, username, email, password, 'USER'])
        .then(resSQL => { return true; })
        .catch(errSQL => { console.error(errSQL.stack); return false; })

    return result;
}

module.exports = { getUser, register };