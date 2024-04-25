const {ADD_DATA} = require("../const/query")
const {db, closeDB} = require("../service/db")
const {STATUS_200, STATUS_500} = require("../const/const")
const axios = require("axios")
const cheerio = require('cheerio')
const {thingspeak} = require("../config/thingspeak")
const {roundValues} = require("../utils/commonFunc")
const {EnvData} = require("../modal/envData")

const saveData = async (req, resp) => {
    try {
        const envModal = new EnvData();
        envModal.n = req.body.n
        envModal.p = req.body.p
        envModal.k = req.body.k
        envModal.temperature = req.body.temperature
        envModal.humidity = req.body.humidity
        envModal.ph = req.body.ph
        envModal.rainfall = req.body.rainfall

        const sql = ADD_DATA(envModal)
        const conn = await db()
        await conn.query(sql)
        resp.status(200).json(STATUS_200(null))
    } catch (e) {
        console.error(e)
        resp.status(500).json(STATUS_500)
    }
}

const getSensorData = async (req, resp) => {
    try {
        const envModal = new EnvData();
        const previousData = []

        await axios.get('https://www.meteo.gov.lk/index.php?lang=en').then(response => {
            const $ = cheerio.load(response.data)
            const title = $('.last24title').last().text()
            const lastData = title.split(' ')[2]
            const match = lastData.match(/\d+(\.\d+)?/)
            envModal.rainfall = match[0]
        })

        await axios.get(`${thingspeak.url}/${thingspeak.channelId}/feeds.json?results=10`)
            .then((response) => {
                const dataList = response?.data?.feeds

                dataList.map((item, i) => {
                    const envTempModal = new EnvData();
                    envTempModal.n = roundValues(item.field1)
                    envTempModal.p = roundValues(item.field2)
                    envTempModal.k = roundValues(item.field3)
                    envTempModal.temperature = roundValues(item.field4)
                    envTempModal.humidity = roundValues(item.field5)
                    envTempModal.ph = roundValues(item.field6)
                    envTempModal.date = item.created_at

                    previousData.push(envTempModal)
                    if (i === (dataList.length - 1)) {
                        envModal.n = roundValues(item.field1)
                        envModal.p = roundValues(item.field2)
                        envModal.k = roundValues(item.field3)
                        envModal.temperature = roundValues(item.field4)
                        envModal.humidity = roundValues(item.field5)
                        envModal.ph = roundValues(item.field6)
                    }
                })
            })
            .catch((error) => {
                console.log('error', error)
            })

        resp.status(200).json(STATUS_200({currentData: envModal, previousData}))
    } catch (e) {
        resp.status(500).json(STATUS_500)
    }
}

module.exports = {
    saveData,
    getSensorData
}