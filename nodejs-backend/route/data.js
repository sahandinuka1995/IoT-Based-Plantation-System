const express = require('express')
const router = express.Router()

const dataController = require('../controller/dataController');

router.post('/save', dataController.saveData)
router.get('/sensor-data', dataController.getSensorData)

module.exports = router