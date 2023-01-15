const express = require('express')
const blog = require('../models/blog')
const blogModel = require('../models/blog')

const blogRouter = express.Router()

// get all blogs
blogRouter.get('/', (req, res) => {
    blogModel.find().limit(20)
    .then(blogs => {
        res.send(blogs)
    })
    .catch(error => {
        res.send(error)
        console.log(error)
    })
})

// get a blog by ID
blogRouter.get('/:id', (req, res) => {
    const blogID = req.params.id

    blogModel.findById(blogID)
    .then(blog => {
        res.send(blog)
    })
    .catch(error => {
        res.send(error)
        console.log(error)
    })
})

// create a blog
blogRouter.post('/', (req, res) => {
    const blog = req.body
    blog.timestamp = new Date()

    blogModel.create(blog)
    .then(blog => {
        res.send(blog)
    })
    .catch(error => {
        res.send(error)
        console.log(error)
    })
})

// update blog by ID 
blogRouter.put('/:id', (req, res) => {
    const blogID = req.params.id
    const blog = req.body
    blog.timestamp = new Date()

    blogModel.findByIdAndUpdate(blogID, blog, {new: true})
    .then(newBlog => {
        res.send(newBlog)
    })
    .catch(error => {
        res.send(error)
        console.log(error);
    })
})

// delete a blog by ID
blogRouter.delete('/:id', (req, res) => {
    const blogID = req.params.id

    blogModel.findByIdAndDelete(blogID)
    .then(() => {
        res.send('User deleted successfully')
    })
    .catch(error => {
        res.send(error)
        console.log(error);
    })

})

// update blog state 
blogRouter.put('/updateBlogState/:id', (req, res) => {
    const blogID = req.params.id
    const newState = req.body.state

    blogModel.findByIdAndUpdate(blogID, { state: newState }, { new: true })
    .then(newBlog => {
        res.json(newBlog)
    })
    .catch(err => {
        res.send(err)
        console.log(err);
    })
})

// owner getting a list of their own blogs
blogRouter.get('/ownersBlogs/:state', (req, res) => {
    const blogState = req.params.state
    blogModel.find({ state: blogState }).limit(20)
    .then(blogs => {
        res.send(blogs)
    })
    .catch(err => {
        res.send(err)
        console.log(err);
    })
})


module.exports = blogRouter