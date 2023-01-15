const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const mongodbConnect = require('./db/mongodb')
// const auth0Middleware = require('./auth/auth0')

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(auth0Middleware)

// mongodb connection 
mongodbConnect

app.get('/', (req, res) => {
    res.send('welcome to my blog app!')
})




app.listen(config.PORT, () => {
    console.log(`server is listening on port: ${config.PORT} `);
})