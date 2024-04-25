const {db, closeDB} = require("../service/db")
const {GET_ALL_USERS, ADD_NEW_USER, FIND_USER_BY_ID, DELETE_USER_BY_ID, UPDATE_USER_BY_ID} = require("../const/query")
const {userCreateValidation} = require("../validation/user")
const {STATUS_400, STATUS_500, STATUS_200} = require("../const/const")
const bcrypt = require("bcrypt")
const {User} = require("../modal/user")

const createUser = async (req, resp) => {
    try {
        const validate = userCreateValidation(req.body, true)
        if (validate?.message) {
            resp.status(400).json(STATUS_400(validate.message))
        } else {
            // hash password
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                const user = new User()
                user.name = req.body.name
                user.role = req.body.role
                user.username = req.body.username
                user.password = hash

                const sql = ADD_NEW_USER(user)
                const conn = await db()
                const result = await conn.query(sql)
                resp.status(200).json(STATUS_200(result[0]))
            });
        }
    } catch (err) {
        resp.status(500).json(STATUS_500)
    }
}

const updateUser = async (req, resp) => {
    try {
        const validate = userCreateValidation(req.body, false)
        if (validate?.message) {
            resp.status(400).json(STATUS_400(validate.message))
        } else {
            const conn = await db()
            const [rows, fields] = await conn.query(FIND_USER_BY_ID(req.params.id))

            if (rows?.length > 0) {
                bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    const user = new User()
                    user.id = rows[0].id
                    user.name = req.body.name
                    user.role = req.body.role
                    user.username = req.body.username
                    user.password = req.body.password ? hash : rows[0].password

                    await conn.query(UPDATE_USER_BY_ID(user))
                })
                resp.status(200).json(STATUS_200(null))
            } else {
                resp.status(400).json(STATUS_400("user not found"))
            }
        }
    } catch (err) {
        resp.status(500).json(STATUS_500)
    }
}

const deleteUser = async (req, resp) => {
    try {
        const conn = await db()
        const [rows, fields] = await conn.query(FIND_USER_BY_ID(req.params.id))

        if (rows?.length > 0) {
            await conn.query(DELETE_USER_BY_ID(rows[0].id))
            resp.status(200).json(STATUS_200(null))
        } else {
            resp.status(400).json(STATUS_400("user not found"))
        }
    } catch (err) {
        resp.status(500).json(STATUS_500)
    }
}

const getAllUsers = async (req, resp) => {
    try {
        const conn = await db()
        const [rows, fields] = await conn.query(GET_ALL_USERS)
        if (rows?.length > 0) {
            const userList = []
            rows.map(item => {
                // loop rows and make password as null for security
                const user = new User()
                user.id = item.id
                user.name = item.name
                user.role = item.role
                user.username = item.username
                userList.push(user)
            })
            await resp.status(200).json(STATUS_200(userList))
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