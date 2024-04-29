const {ADD_DATA} = require("../const/query")
const {db, closeDB} = require("../service/db")
const {STATUS_200, STATUS_500, ENV_TYPES} = require("../const/const")
const axios = require("axios")
const cheerio = require('cheerio')
const {thingspeak} = require("../config/thingspeak")
const {ParseFloat} = require("../utils/commonFunc")
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
        // console.log(req.query)
        const envModal = new EnvData();
        const previousData = []

        await axios.get('https://www.meteoblue.com/en/weather/today/colombo_sri-lanka_1248991').then(response => {
            const $ = cheerio.load(response.data)

            let rainfall = $('.precipitationamounts > td > .now').text()
            envModal.rainfall = Number.parseFloat(rainfall)
        })

        await axios.get(`${thingspeak.url}/${thingspeak.channelId}/feeds.json?results=10`)
            .then((response) => {
                const dataList = response?.data?.feeds

                dataList.map((item, i) => {
                    const envTempModal = new EnvData();
                    envTempModal.n = ParseFloat(ENV_TYPES.NITROGEN, item.field1)
                    envTempModal.p = ParseFloat(ENV_TYPES.PHOSPHORUS, item.field2)
                    envTempModal.k = ParseFloat(ENV_TYPES.POTASSIUM, item.field3)
                    envTempModal.temperature = ParseFloat(ENV_TYPES.TEMPERATURE, item.field4)
                    envTempModal.humidity = ParseFloat(ENV_TYPES.HUMIDITY, item.field5)
                    envTempModal.ph = ParseFloat(ENV_TYPES.PH, item.field6)
                    envTempModal.rainfall = envModal.rainfall
                    envTempModal.date = item.created_at
                    previousData.push(envTempModal)

                    if (i === (dataList.length - 1)) {
                        envModal.n = ParseFloat(ENV_TYPES.NITROGEN, item.field1)
                        envModal.p = ParseFloat(ENV_TYPES.PHOSPHORUS, item.field2)
                        envModal.k = ParseFloat(ENV_TYPES.POTASSIUM, item.field3)
                        envModal.temperature = ParseFloat(ENV_TYPES.TEMPERATURE, item.field4)
                        envModal.humidity = ParseFloat(ENV_TYPES.HUMIDITY, item.field5)
                        envModal.ph = ParseFloat(ENV_TYPES.PH, item.field6)
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