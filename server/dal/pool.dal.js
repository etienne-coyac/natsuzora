if(process.env.NODE_ENV !== 'production'){require('dotenv').config();}
const {Pool} = require('pg');
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    max: 15,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}