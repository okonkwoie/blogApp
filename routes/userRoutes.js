const express = require('express')
const user = require('../models/user')
const userModel = require('../models/user')

const userRouter = express.Router()

// get all users
userRouter.get('/', (req, res) => {
    userModel.find()
    .then(users => {
        res.send(users)
    })
    .catch(error => {
        res.send(error)
        console.log(error)
    })
})

// get a user by ID
userRouter.get('/:id', (req, res) => {
    const userID = req.params.id

    userModel.findById(userID)
    .then(user => {
        res.send(user)
    })
    .catch(error => {
        res.send(error)
        console.log(error)
    })
})

// create a user
userRouter.post('/', (req, res) => {
    const user = req.body
    user.timestamp = new Date()

    userModel.create(user)
    .then(user => {
        res.send(user)
    })
    .catch(error => {
        res.send(error)
        console.log(error)
    })
})

// update user by ID 
userRouter.put('/:id', (req, res) => {
    const userID = req.params.id
    const user = req.body
    user.timestamp = new Date()

    userModel.findByIdAndUpdate(userID, user, {new: true})
    .then(newUser => {
        res.send(newUser)
    })
    .catch(error => {
        res.send(error)
        console.log(error);
    })
})

// delete a user by ID
userRouter.delete('/:id', (req, res) => {
    const userID = req.params.id

    userModel.findByIdAndDelete(userID)
    .then(() => {
        res.send('User deleted successfully')
    })
    .catch(error => {
        res.send(error)
        console.log(error);
    })

})

module.exports = userRouter