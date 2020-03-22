const dotenv = require('dotenv')
dotenv.config({path: __dirname + '/../../.env'})
var path = require('path')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const mockAPIResponse = require('./mockAPI.js')
const aylien = require('aylien_textapi')

const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
})

textapi.sentiment({
    'text': 'John is a very good football player!'
}, function (error, response, rateLimits) {
    console.log('rate limits', rateLimits)
    if (error === null) {
        console.log('response', response)
    } else {
        console.log('error', error)
    }
})

console.log(process.env.API_KEY)

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
