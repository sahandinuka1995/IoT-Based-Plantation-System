const {userDto} = require("../dto/user");
const mysql = require("mysql2/promise");
const config = require("../config/db");
const db = require("../service/db");
const {GET_ALL_USERS, ADD_NEW_USER} = require("../const/query");
const {userCreateValidation} = require("../validation/user");
const {STATUS_400, STATUS_500, STATUS_200} = require("../const/const");
const bcrypt = require("bcrypt")

const createUser = async (req, resp) => {
    try {
        const validate = userCreateValidation(req.body)
        if (validate?.message) {
            resp.status(400).json(STATUS_400(validate.message))
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                const sql = ADD_NEW_USER({
                    name: req.body.name,
                    role: req.body.role,
                    password: hash
                })

                const conn = await db()
                await conn.query(sql);

                resp.status(200).json(STATUS_200(null))
            });
        }
    } catch (err) {
        resp.status(500).json(STATUS_500)
    }
}

const updateUser = (req, resp) => {
    console.log('updateUser')
}

const deleteUser = (req, resp) => {
    console.log('deleteUser')
}

const getAllUsers = async (req, resp) => {
    try {
        const conn = await db()
        const [rows, fields] = await conn.query(GET_ALL_USERS);
        if (rows?.length > 0) {
            resp.status(STATUS_200).json(rows.map(item => {
                // loop rows and make password as null for security
                return {
                    ...item,
                    password: null
                }
            }))
        }
    } catch (err) {
        resp.status(500).json(STATUS_500)
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers
}