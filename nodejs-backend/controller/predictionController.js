const {STATUS_200, STATUS_500, ENV_TYPES, RAINFALL_LOCATIONS, STATUS_400} = require("../const/const")
const axios = require('axios')
const {thingspeak} = require("../config/thingspeak")
const predictionList = require("../const/predictions")
const {ParseFloat} = require("../utils/commonFunc");
const cheerio = require("cheerio");
const {EnvData} = require("../modal/envData")

const getPrediction = async (req, resp) => {
    try {
        const envModal = new EnvData();
        const locationData = RAINFALL_LOCATIONS[req?.query?.location] ?? RAINFALL_LOCATIONS.colombo

        await axios.get(`${thingspeak.url}/${thingspeak.channelId}/feeds.json?results=1`)
            .then((response) => {
                const sensorData = response?.data?.feeds[0]
                envModal.n = ParseFloat(ENV_TYPES.NITROGEN, sensorData.field1, locationData.n)
                envModal.p = ParseFloat(ENV_TYPES.PHOSPHORUS, sensorData.field2, locationData.p)
                envModal.k = ParseFloat(ENV_TYPES.POTASSIUM, sensorData.field3, locationData.k)
                envModal.temperature = ParseFloat(ENV_TYPES.TEMPERATURE, sensorData.field4)
                envModal.humidity = ParseFloat(ENV_TYPES.HUMIDITY, sensorData.field5, locationData.humidity)
                envModal.ph = ParseFloat(ENV_TYPES.PH, sensorData.field6)
            })
            .catch((error) => {
                console.log('error', error)
                resp.status(200).json(STATUS_400("Can't connect to thingspeak"))
            });

        const rainfallUrl = `https://www.meteoblue.com/en/weather/today/${locationData.name}_sri-lanka_${locationData.id}`
        await axios.get(rainfallUrl).then(response => {
            const $ = cheerio.load(response.data)

            let rainfall = $('.precipitationamounts > td > .now').text()
            console.log(rainfall)
            envModal.rainfall = Number.parseFloat(rainfall)
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
            .then(async (response) => {
                res = {predictionResult: predictionList[response.data.data], sensorData: envModal}
                await resp.status(200).json(STATUS_200(res))
            })
            .catch((error) => {
                console.log('prediction error :', error.data);
                resp.status(200).json(STATUS_400("Something went wrong in prediction"))
            });

    } catch (e) {
        await resp.status(500).json(STATUS_500)
    }
}
module.exports = {
    getPrediction
}