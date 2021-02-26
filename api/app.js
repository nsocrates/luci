const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const api = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Register routes
app.use('/api', api)

module.exports = app
