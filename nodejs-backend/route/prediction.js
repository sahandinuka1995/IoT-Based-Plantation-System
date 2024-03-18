const express = require('express')
const router = express.Router()

const predictionController = require('../controller/predictionController');

router.post('/prediction', predictionController.getPrediction)

module.exports = router