const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const mongodbConnect = require('./db/mongodb')
const userRouter = require('./routes/userRoutes')
// const auth0Middleware = require('./auth/auth0')

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(auth0Middleware)

// for routers
app.use('/api/v1/users', userRouter)

// mongodb connection 
mongodbConnect

// error handler middleware
app.use((err, req, res, next) => {
    res.send(err.message)
    next()
})







app.get('/', (req, res) => {
    res.send('welcome to my blog app!')
})




app.listen(config.PORT, () => {
    console.log(`server is listening on port: ${config.PORT} `);
})