const {ADD_DATA} = require("../const/query")
const db = require("../service/db")
const {STATUS_200, STATUS_500} = require("../const/const")
const axios = require('axios')

const getPrediction = async (req, resp) => {
    try {
        const request_data = {
            N: req.body.N,
            P: req.body.P,
            K: req.body.K,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            ph: req.body.ph,
            rainfall: req.body.rainfall
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
                console.log(error.data);
            });

        await resp.status(200).json(STATUS_200(res))
    } catch (e) {
        await resp.status(500).json(STATUS_500)
    }
}
module.exports = {
    getPrediction
}