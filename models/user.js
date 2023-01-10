const mongoose = require('mongoose')

// define a schema 
const Schema = mongoose.Schema

// define a user schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    }, 

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.Schema('user', userSchema)

