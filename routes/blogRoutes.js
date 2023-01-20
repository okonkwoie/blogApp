const express = require('express')
const blogController = require('../controller/blog_controller')

const blogRouter = express.Router()


// get all blogs
blogRouter.get('/getAllBlogs', blogController.getAllBlogs)

// get a blog by ID
blogRouter.get('/getBlogByID/:id', blogController.getBlogByID)

// create a blog
blogRouter.post('/createBlog', blogController.createBlog)

// update blog by ID 
blogRouter.put('/updateByID/:id', blogController.updateBlogByID)

// delete a blog by ID
blogRouter.delete('/deleteByID/:id', blogController.deleteBlog)

// update blog state 
blogRouter.put('/updateBlogState/:id', blogController.updateBlogByID)

// owner getting a list of their own blogs
blogRouter.get('/ownersBlogs', blogController.getOwnersBlogs)



module.exports = blogRouter