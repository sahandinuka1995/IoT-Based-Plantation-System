const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require("cors")

const {BASE_PATH} = require("./const/const")
dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const userRoute = require('./route/user')
const authRoute = require('./route/auth')
const dataRoute = require('./route/data')
const predictionRoute = require('./route/prediction')

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use(`${BASE_PATH}/user`, userRoute)
app.use(`${BASE_PATH}/auth`, authRoute)
app.use(`${BASE_PATH}/data`, dataRoute)
app.use(`${BASE_PATH}`, predictionRoute)