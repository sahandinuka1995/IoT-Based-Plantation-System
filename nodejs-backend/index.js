const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const {BASE_PATH} = require("./const/const");

app.use(express.json())

const userRoute = require('./route/user');

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use(`${BASE_PATH}/user`, userRoute);