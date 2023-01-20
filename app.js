const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const mongodbConnect = require('./db/mongodb')
const userRouter = require('./routes/userRoutes')
const blogRouter = require('./routes/blogRoutes')
const helmet = require('helmet')
const rateLimiter = require('./ratelimiting/rate_limiter')
const logger = require('./logging/logger')
const auth0Middleware = require('./auth/auth0')
const { requiresAuth } = require('express-openid-connect')

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(auth0Middleware)
// app.use(jwtCheck)

// accessible routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/blogs', blogRouter)

// protected routes
app.use('/api/v1/blogs/createBlog', requiresAuth(), blogRouter)
app.use('/api/v1/blogs/updateBlogState/:id', requiresAuth(), blogRouter)
app.use('/api/v1/blogs/updateByID/:id', requiresAuth(), blogRouter)
app.use('/api/v1/blogs/deleteByID/:id', requiresAuth(), blogRouter)
app.use('/api/v1/blogs/ownersBlogs/:state', requiresAuth(), blogRouter)

// mongodb connection 
mongodbConnect

// security middleware
app.use(helmet())

// rate limiting middleware to all requests
app.use(rateLimiter)

// error handler middleware
app.use((err, req, res, next) => {
    logger.error(err.message)
    res.status(500).send({
        error: 'An unexpected error occurred'
    })
    next()
})


// home route
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})







app.listen(config.PORT, () => {
    logger.info(`server is listening on port: ${config.PORT} `);
})