const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const mongodbConnect = require('./db/mongodb')
const userRouter = require('./routes/userRoutes')
const blogRouter = require('./routes/blogRoutes')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')


// const auth0Middleware = require('./auth/auth0')

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(auth0Middleware)

// for routers
app.use('/api/v1/users', userRouter)
app.use('/api/v1/blogs', blogRouter)

// mongodb connection 
mongodbConnect

// security middleware
app.use(helmet())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter)

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