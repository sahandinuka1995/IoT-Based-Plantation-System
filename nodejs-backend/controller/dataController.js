const {ADD_DATA} = require("../const/query")
const {db} = require("../service/db")
const {STATUS_200, STATUS_500} = require("../const/const")
const axios = require("axios")
const cheerio = require('cheerio')
const {thingspeak} = require("../config/thingspeak");
const {roundValues} = require("../utils/commonFunc");

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
        let currentData = {
            n: 0,
            p: 0,
            k: 0,
            humidity: 0,
            temperature: 0,
            ph: 0,
            rainfall: 0
        }
        const previousData = []

        await axios.get('https://www.meteo.gov.lk/index.php?lang=en').then(response => {
            const $ = cheerio.load(response.data)
            const title = $('.last24title').last().text()
            const lastData = title.split(' ')[2]
            const match = lastData.match(/\d+(\.\d+)?/)
            currentData = {...currentData, rainfall: match[0]}
        })

        await axios.get(`${thingspeak.url}/${thingspeak.channelId}/feeds.json?results=10`)
            .then((response) => {
                const dataList = response?.data?.feeds

                dataList.map((item, i) => {
                    const tempRow = {
                        ...currentData,
                        n: roundValues(item.field1),
                        p: roundValues(item.field2),
                        k: roundValues(item.field3),
                        temperature: roundValues(item.field4),
                        humidity: roundValues(item.field5),
                        ph: roundValues(item.field6),
                        date: item.created_at
                    }

                    previousData.push(tempRow)
                    if (i === (dataList.length - 1)) currentData = tempRow
                })
            })
            .catch((error) => {
                console.log('error', error)
            })

        resp.status(200).json(STATUS_200({currentData, previousData}))
    } catch (e) {
        resp.status(500).json(STATUS_500)
    }
}

module.exports = {
    saveData,
    getSensorData
}