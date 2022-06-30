const db = require('./pool.dal');

async function getConfig(name){
    return await db.query('SELECT value FROM config WHERE name=$1', [name])
               .then(resSQL => {return resSQL.rows[0]['value']})
               .catch(errSQL => {console.error(errSQL.stack); return -1;})
}

module.exports = {getConfig};