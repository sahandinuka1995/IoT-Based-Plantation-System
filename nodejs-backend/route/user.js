const express = require('express')
const router = express.Router()

const userController = require('../controller/userController');

router.post('/create', userController.createUser)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/get-all', userController.getAllUsers)

module.exports = router