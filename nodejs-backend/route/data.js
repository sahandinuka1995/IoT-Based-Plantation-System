const express = require('express')
const router = express.Router()

const dataController = require('../controller/dataController');

router.post('/save', dataController.saveData)

module.exports = router