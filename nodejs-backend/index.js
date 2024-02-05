const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const {BASE_PATH} = require("./const/const")
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const userRoute = require('./route/user')
const authRoute = require('./route/auth')

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use(`${BASE_PATH}/user`, userRoute)
app.use(`${BASE_PATH}/auth`, authRoute)