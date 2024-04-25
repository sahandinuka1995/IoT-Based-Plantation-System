const mysql = require('mysql2/promise')
const {CREATE_DATABASE, CREATE_USER_TABLE, USE_DATABASE, ADD_ADMIN_USER, CREATE_DATA_TABLE} = require("../const/query")

let conn;
const db = async () => {
    if (conn) return conn;

    try {
        conn = await mysql.createPool({
            host: process.env.DATABASE_HOST.trim(),
            port: parseInt(process.env.DATABASE_PORT.trim(), 10),
            user: process.env.DATABASE_USER.trim(),
            password: process.env.DATABASE_PASSWORD.trim(),
            database: process.env.DATABASE_NAME.trim(),
            multipleStatements: true,
            waitForConnections: true,
        });

        await conn.query(CREATE_DATABASE)
        await conn.query(USE_DATABASE)
        await conn.query(CREATE_USER_TABLE)
        await conn.query(ADD_ADMIN_USER)
        await conn.query(CREATE_DATA_TABLE)

        return conn
    } catch (e) {
        console.error('DB connection error:', error);
        throw error;
    }
}

const closeDB = async () => {
    if (!conn) return;

    try {
        await conn.end();
        console.log('DB connection closed');
    } catch (error) {
        console.error('Error closing the DB connection:', error);
        throw error;
    }
};

module.exports = {db, closeDB}