const {ADMIN_PASSWORD} = require("./const")

// sql queries
const CREATE_DATABASE = "CREATE DATABASE IF NOT EXISTS iot_plantation"

const USE_DATABASE = "USE iot_plantation"

const CREATE_USER_TABLE = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, username VARCHAR(100) NOT NULL, role ENUM('ADMIN', 'USER') NOT NULL, password VARCHAR(255) NOT NULL)"

const CREATE_DATA_TABLE = "CREATE TABLE IF NOT EXISTS data (id INT AUTO_INCREMENT PRIMARY KEY, N DECIMAL NOT NULL, P DECIMAL NOT NULL, K DECIMAL NOT NULL, temperature DECIMAL NOT NULL, humidity DECIMAL NOT NULL, ph DECIMAL NOT NULL, rainfall DECIMAL NOT NULL)"

const ADD_ADMIN_USER = `INSERT INTO users (id, name, role, password, username)
                        SELECT 1,
                               'Sahan Dinuka',
                               'ADMIN',
                               '$2a$10$wpbOlcZGR9X/qrJ209VmKey6z55oZd6KTynkuHs6csMLTQOKPg5Oi',
                               'sahan'
                        FROM dual
                        WHERE NOT EXISTS(SELECT * FROM users)`

const ADD_DATA = (data) => `INSERT INTO data (N, P, K, temperature, humidity, ph, rainfall)
                            VALUES ("${data.n}", "${data.p}", "${data.k}", "${data.temperature}", "${data.humidity}",
                                    "${data.ph}", "${data.rainfall}")`

const GET_ALL_USERS = "SELECT * FROM users"

const ADD_NEW_USER = (data) => `INSERT INTO users (name, role, password, username) VALUE ("${data.name}", "${data.role}", "${data.password}", "${data.username}")`

const FIND_USER_BY_ID = (id) => `SELECT *
                                 FROM users
                                 WHERE id = ${id}`

const DELETE_USER_BY_ID = (id) => `DELETE
                                   FROM users
                                   WHERE id = ${id}`

const UPDATE_USER_BY_ID = (data) => `UPDATE users
                                     SET name="${data.name}",
                                         role="${data.role}",
                                         password="${data.password}",
                                         username="${data.username}"
                                     WHERE id = "${data.id}"`

const FIND_USER_BY_USERNAME = (username) => `SELECT *
                                             FROM users
                                             WHERE username = "${username}" LIMIT 1`

module.exports = {
    CREATE_DATABASE,
    USE_DATABASE,
    CREATE_USER_TABLE,
    ADD_ADMIN_USER,
    GET_ALL_USERS,
    ADD_NEW_USER,
    FIND_USER_BY_ID,
    DELETE_USER_BY_ID,
    UPDATE_USER_BY_ID,
    FIND_USER_BY_USERNAME,
    CREATE_DATA_TABLE,
    ADD_DATA
}