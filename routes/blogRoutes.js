const express = require('express')
const blogModel = require('../models/blog')
const readingTime = require('../readtime/readingTime')
const bookController = require('../controller/blog_controller')

const blogRouter = express.Router()


// get all blogs
blogRouter.get('/getAllBlogs', bookController.getAllBlogs)

// get a blog by ID
blogRouter.get('/getBlogByID/:id', bookController.getBlogByID)

// create a blog
blogRouter.post('/createBlog', bookController.createBlog)

// update blog by ID 
blogRouter.put('/updateByID/:id', bookController.updateBlogByID)

// delete a blog by ID
blogRouter.delete('/deleteByID/:id', bookController.deleteBlog)

// update blog state 
blogRouter.put('/updateBlogState/:id', book.Controller.updateBlogByID)

// owner getting a list of their own blogs
blogRouter.get('/ownersBlogs', bookController.getOwnersBlogs)



module.exports = blogRouter