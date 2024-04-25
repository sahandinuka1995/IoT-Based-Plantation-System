const {STATUS_500, STATUS_400, STATUS_200} = require("../const/const")
const {authValidation} = require("../validation/auth")
const bcrypt = require("bcrypt")
const {FIND_USER_BY_USERNAME} = require("../const/query")
const {db, closeDB} = require("../service/db")
const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = require("../config/keys")
const {User} = require("../modal/user")

const login = async (req, resp) => {
    try {
        const validate = authValidation(req.body)
        if (validate?.message) {
            resp.status(400).json(STATUS_400(validate.message))
        } else {
            const sql = FIND_USER_BY_USERNAME(req.body.username)
            const conn = await db()
            const [rows, fields] = await conn.query(sql)

            if (rows.length > 0) {
                const user = rows[0]
                bcrypt.compare(req.body.password, user.password, function (err, res) {
                    if (res) {
                        let jwtSecretKey = process.env.JWT_SECRET_KEY.trim()
                        let data = {
                            time: Date(),
                            userId: user.id,
                        }
                        let signedToken = jwt.sign(data, jwtSecretKey)

                        const userModal = new User()
                        userModal.id = user.id
                        userModal.username = user.username
                        userModal.name = user.name
                        userModal.role = user.role

                        resp.status(200).json(STATUS_200({
                            access_token: signedToken,
                            user: userModal
                        }))
                    } else {
                        resp.status(404).json(STATUS_400('invalid password'))
                    }
                });
            } else {
                resp.status(404).json(STATUS_400('user not found'))
            }
        }
    } catch (e) {
        resp.status(500).json(STATUS_500)
    }
}
module.exports = {
    login
}