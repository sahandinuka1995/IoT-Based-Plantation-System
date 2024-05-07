const config = require('../config/db')
const mysql = require('mysql2/promise')
const {CREATE_DATABASE, CREATE_USER_TABLE, USE_DATABASE, ADD_ADMIN_USER, CREATE_DATA_TABLE} = require("../const/query")

let conn;
const db = async () => {
    if (conn) return conn;

    try {
        conn = await mysql.createPool(config)

        await conn.query(CREATE_DATABASE)
        await conn.query(USE_DATABASE)
        await conn.query(CREATE_USER_TABLE)
        await conn.query(ADD_ADMIN_USER)
        await conn.query(CREATE_DATA_TABLE)

        return conn
    } catch (error) {
        console.error('DB connection error:', error);
        throw error;
    } finally {
        if (conn) {
            await conn.release();
        }
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