const express = require('express')
const router = express.Router()

const predictionController = require('../controller/predictionController');

router.get('/prediction', predictionController.getPrediction)

module.exports = router