const blogModel = require('../models/blog')
const readingTime = require('../readtime/readingTime')

function getAllBlogs(req, res){
    let search = req.query.search
   if(!search){
    search = {}
   } else {
    search = { $or: [
        { author: {$regex: search, $options: 'i'} },
        { title: {$regex: search, $options: 'i'} },
        { tags: {$regex: search, $options: 'i'} }
    ]}
   }

  //sorting the search
   let sort = req.query.sort
   if(!sort){
    sort = {}
   } else {
    sort = { [sort]: -1 }
   }
   
   const page = req.query.page || 1
   const pageLimit = req.query.pageLimit || 20
   const skip = ((page - 1) * pageLimit)

    blogModel.find(search)
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
}

function getBlogByID(req, res){
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
}

function createBlog(req, res){
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
}

function updateBlogByID(req, res){
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
}

function deleteBlog(req, res){
    const blogID = req.params.id

    blogModel.findByIdAndDelete(blogID)
    .then(() => {
        res.send({
            message: 'User deleted successfully'
        })
    })
    .catch(error => {
        res.send(error)
        console.log(error);
    })
}

function updateBlogState(req, res){
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
}

function getOwnersBlogs(req, res){
    const blogState = req.query.state
    const page = req.query.page || 1
    const pageLimit = req.params.pageLimit || 20
    const skip = (page - 1) * pageLimit

    blogModel.find({ state: blogState })
    .skip(skip)
    .limit(pageLimit)
    .then(blogs => {
        res.status(200).send({
            data: blogs,
            meta: {
                currentPage: page,
                pageLimit: pageLimit,
            }
        })

    })
    .catch(err => {
        res.status(500).send({
            message: 'An error occurred retrieving blogs'
        })
        console.log(err);
    })
}

module.exports = {
    getAllBlogs,
    getBlogByID,
    createBlog,
    updateBlogByID,
    deleteBlog,
    updateBlogState,
    getOwnersBlogs
}