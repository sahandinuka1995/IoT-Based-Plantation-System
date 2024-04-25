const {STATUS_200, STATUS_500, ENV_TYPES} = require("../const/const")
const axios = require('axios')
const {thingspeak} = require("../config/thingspeak")
const predictionList = require("../const/predictions")
const {ParseFloat} = require("../utils/commonFunc");
const cheerio = require("cheerio");
const {EnvData} = require("../modal/envData")

const getPrediction = async (req, resp) => {
    try {
        const envModal = new EnvData();

        await axios.get(`${thingspeak.url}/${thingspeak.channelId}/feeds.json?results=1`)
            .then((response) => {
                const sensorData = response?.data?.feeds[0]
                envModal.n = ParseFloat(ENV_TYPES.NITROGEN, sensorData.field1)
                envModal.p = ParseFloat(ENV_TYPES.PHOSPHORUS, sensorData.field2)
                envModal.k = ParseFloat(ENV_TYPES.POTASSIUM, sensorData.field3)
                envModal.temperature = ParseFloat(ENV_TYPES.TEMPERATURE, sensorData.field4)
                envModal.humidity = ParseFloat(ENV_TYPES.HUMIDITY, sensorData.field5)
                envModal.ph = ParseFloat(ENV_TYPES.PH, sensorData.field6)
            })
            .catch((error) => {
                console.log('error', error)
            });

        await axios.get('https://www.meteo.gov.lk/index.php?lang=en').then(response => {
            const $ = cheerio.load(response.data)
            const title = $('.last24title').last().text()
            const lastData = title.split(' ')[2]
            const match = lastData.match(/\d+(\.\d+)?/)
            envModal.rainfall = match[0]
        })

        const request_data = {
            N: envModal.n,
            P: envModal.p,
            K: envModal.k,
            temperature: envModal.temperature,
            humidity: envModal.humidity,
            ph: envModal.ph,
            rainfall: envModal.rainfall
        }

        const config = {
            data: request_data,
            method: 'post',
            url: 'https://iot-based-plantation-system.onrender.com/prediction',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let res = null
        await axios.request(config)
            .then((response) => {
                res = {predictionResult: predictionList[response.data.data], sensorData: envModal}
            })
            .catch((error) => {
                console.log('prediction error :', error.data);
            });

        await resp.status(200).json(STATUS_200(res))
    } catch (e) {
        await resp.status(500).json(STATUS_500)
    }
}
module.exports = {
    getPrediction
}