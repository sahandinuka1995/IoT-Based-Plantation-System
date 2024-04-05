const {ADD_DATA} = require("../const/query")
const {db} = require("../service/db")
const {STATUS_200, STATUS_500} = require("../const/const")

const saveData = async (req, resp) => {
    try {
        const sql = ADD_DATA({
            n: req.body.n,
            p: req.body.p,
            k: req.body.k,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            ph: req.body.ph,
            rainfall: req.body.rainfall
        })

        const conn = await db()
        await conn.query(sql)
        resp.status(200).json(STATUS_200(null))
    } catch (e) {
        resp.status(500).json(STATUS_500)
    }
}
module.exports = {
    saveData
}