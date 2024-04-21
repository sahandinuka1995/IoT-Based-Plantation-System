const {ADD_DATA} = require("../const/query")
const {db} = require("../service/db")
const {STATUS_200, STATUS_500} = require("../const/const")
const axios = require("axios")
const cheerio = require('cheerio')
const {thingspeak} = require("../config/thingspeak");

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

const getSensorData = async (req, resp) => {
    try {
        let sensorData = {
            n: 0,
            p: 0,
            k: 0,
            humidity: 0,
            temperature: 0,
            ph: 0,
            rainfall: 0
        }

        await axios.get('https://www.meteo.gov.lk/index.php?lang=en').then(response => {
            const $ = cheerio.load(response.data)
            const title = $('.last24title').last().text()
            const lastData = title.split(' ')[2]
            const match = lastData.match(/\d+(\.\d+)?/)
            sensorData = {...sensorData, rainfall: match[0]}
        })

        await axios.get(`${thingspeak.url}/${thingspeak.channelId}/feeds.json?results=1`)
            .then((response) => {
                const data = response?.data?.feeds[0]
                sensorData = {
                    ...sensorData,
                    n: data.field1,
                    p: data.field2,
                    k: data.field3,
                    temperature: data.field4,
                    humidity: data.field5,
                    ph: data.field6
                }
            })
            .catch((error) => {
                console.log('error', error)
            })

        resp.status(200).json(STATUS_200(sensorData))
    } catch (e) {
        resp.status(500).json(STATUS_500)
    }
}

module.exports = {
    saveData,
    getSensorData
}