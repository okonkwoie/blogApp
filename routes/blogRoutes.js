const express = require('express')
const blog = require('../models/blog')
const blogModel = require('../models/blog')
const readingTime = require('../readtime/readingTime')

const blogRouter = express.Router()

// get all blogs
blogRouter.get('/', (req, res) => {
   const page = req.query.page || 1
   const pageLimit = 4
   const skip = ((page - 1) * pageLimit)

    blogModel.find()
    .skip(skip)
    .limit(pageLimit)
    .then((blogs) => {
        blogModel.countDocuments({})
        .then((count) => {
           res.send({
            data: blogs,
            meta: {
                currentPage: page,
                pageLimit: pageLimit,
                total_result: count
            }
          })
        })
    })
    .catch(error => {
        res.send({
            message: 'blogs not found'
        })
        console.log(error)
    })
})

// get a blog by ID
blogRouter.get('/:id', (req, res) => {
    const blogID = req.params.id

    blogModel.findByIdAndUpdate(blogID, { $inc: { read_count: 1 } },  { new: true })
    .then(() => {
        blogModel.findById(blogID)
          .then((blog) => {
          blog.reading_time = readingTime(blog.body)
          res.status(200).send(blog)
        })
          .catch((error) => {
            res.status(404).send({
                message: 'Blog not found'
            })
            console.log(error)
        })
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
blogRouter.put('/:id', async (req, res) => {
    const blogID = req.params.id
    const blog = req.body
    blog.timestamp = new Date()

    await blogModel.findByIdAndUpdate(blogID, blog, {new: true})
    .then(newBlog => {
        res.send(newBlog)
    })
    .catch(error => {
        res.send(error)
        console.log(error);
    })
})

// delete a blog by ID
blogRouter.delete('/:id', async (req, res) => {
    const blogID = req.params.id

    await blogModel.findByIdAndDelete(blogID)
    .then(() => {
        res.send({
            message: 'User deleted successfully'
        })
    })
    .catch(error => {
        res.send(error)
        console.log(error);
    })

})

// update blog state 
blogRouter.put('/updateBlogState/:id', async (req, res) => {
    const blogID = req.params.id
    const newState = req.body.state

    await blogModel.findByIdAndUpdate(blogID, { state: newState }, { new: true })
    .then(newBlog => {
        res.json(newBlog)
    })
    .catch(err => {
        res.send(err)
        console.log(err);
    })
})

// owner getting a list of their own blogs
blogRouter.get('/ownersBlogs/:state', async (req, res) => {
    const blogState = req.params.state
    const page = req.params.page || 1
    const limit = 20

    await blogModel.find({ state: blogState })
    .skip((page - 1) * limit)
    .limit(limit)
    .then(blogs => {
        res.send(blogs)
    })
    .catch(err => {
        res.send(err)
        console.log(err);
    })
})


module.exports = blogRouter