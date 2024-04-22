const {STATUS_200, STATUS_500} = require("../const/const")
const axios = require('axios')
const {thingspeak} = require("../config/thingspeak")
const {tomorrow} = require("../config/rainfall")
const predictionList = require("../const/predictions")
const {roundValues} = require("../utils/commonFunc");

const getPrediction = async (req, resp) => {
    try {
        let sensorData = null
        let rainfall = 0

        await axios.get(`${thingspeak.url}/${thingspeak.channelId}/feeds.json?results=1`)
            .then((response) => {
                sensorData = response?.data?.feeds[0]
            })
            .catch((error) => {
                console.log('error', error)
            });

        await axios.get(tomorrow.url)
            .then((response) => {
                //rainfall = response?.data?.data?.timelines[0]?.intervals[0]?.values?.precipitationIntensity
                rainfall = response?.data?.clouds?.all
            })
            .catch((error) => {
                console.log('error', error)
            });

        const request_data = {
            N: roundValues(sensorData.field1),
            P: roundValues(sensorData.field2),
            K: roundValues(sensorData.field3),
            temperature: roundValues(sensorData.field4),
            humidity: roundValues(sensorData.field5),
            ph: roundValues(sensorData.field6),
            rainfall
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
                res = {predictionResult: predictionList[response.data.data], sensorData: request_data}
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