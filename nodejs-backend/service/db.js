const config = require('../config/db')
const mysql = require('mysql2/promise')
const {CREATE_DATABASE, CREATE_USER_TABLE, USE_DATABASE, ADD_ADMIN_USER} = require("../const/query")

const db = async () => {
    try {
        const conn = await mysql.createConnection(config)

        await conn.query(CREATE_DATABASE)
        await conn.query(USE_DATABASE)
        await conn.query(CREATE_USER_TABLE)
        await conn.query(ADD_ADMIN_USER)

        return conn
    } catch (e) {
        console.error(e)
        return
    }
}

module.exports = db