const {STATUS_200, STATUS_500} = require("../const/const")
const axios = require('axios')
const {thingspeak} = require("../config/thingspeak")
const {tomorrow} = require("../config/rainfall")

const getPrediction = async (req, resp) => {
    try {
        let sensorData = null
        let rainfall = null
        await axios.get(`${thingspeak.url}/2483610/feeds.json`)
            .then((response) => {
                sensorData = response?.data?.feeds[0]
            })
            .catch((error) => {
                console.log('error', error)
            });

        await axios.get(tomorrow.url)
            .then((response) => {
                rainfall = response?.data?.data?.timelines[0]?.intervals[0]?.values?.precipitationIntensity
            })
            .catch((error) => {
                console.log('error', error)
            });

        // const request_data = {
        //     N: req.body.N,
        //     P: req.body.P,
        //     K: req.body.K,
        //     temperature: req.body.temperature,
        //     humidity: req.body.humidity,
        //     ph: req.body.ph,
        //     rainfall: req.body.rainfall
        // }

        const request_data = {
            N: sensorData.field1,
            P: sensorData.field2,
            K: sensorData.field3,
            temperature: sensorData.field4,
            humidity: sensorData.field5,
            ph: sensorData.field6,
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
                res = response.data.data
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