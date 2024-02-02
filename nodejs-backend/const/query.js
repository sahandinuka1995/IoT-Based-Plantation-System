const {ADMIN_PASSWORD} = require("./const")

// sql queries
const CREATE_DATABASE = "CREATE DATABASE IF NOT EXISTS iot_plantation"

const USE_DATABASE = "USE iot_plantation"

const CREATE_USER_TABLE = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, role ENUM('ADMIN', 'USER') NOT NULL, password VARCHAR(255) NOT NULL)"

const ADD_ADMIN_USER = `INSERT INTO users (id, name, role, password)
                        SELECT 1,
                               'Sahan Dinuka',
                               'ADMIN',
                               '$2a$10$wpbOlcZGR9X/qrJ209VmKey6z55oZd6KTynkuHs6csMLTQOKPg5Oi'
                        FROM dual
                        WHERE NOT EXISTS(SELECT * FROM users)`

const GET_ALL_USERS = "SELECT * FROM users"

const ADD_NEW_USER = (data) => `INSERT INTO users (name, role, password) VALUE ("${data.name}", "${data.role}", "${data.password}")`

const FIND_USER_BY_ID = (id) => `SELECT *
                                 FROM users
                                 WHERE id = ${id}`

const DELETE_USER_BY_ID = (id) => `DELETE
                                   FROM users
                                   WHERE id = ${id}`

module.exports = {
    CREATE_DATABASE,
    USE_DATABASE,
    CREATE_USER_TABLE,
    ADD_ADMIN_USER,
    GET_ALL_USERS,
    ADD_NEW_USER,
    FIND_USER_BY_ID,
    DELETE_USER_BY_ID
}