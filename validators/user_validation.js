const Joi = require('joi')

const userSchema = Joi.object({
    firstName: Joi.string()
            .min(1)
            .max(200)
            .required(),
    lastName: Joi.string()
            .min(1)
            .max(200)
            .required(),
    email: Joi.string()
            .required()
            .unique(),
    password: Joi.string()
            .required()
})

module.exports = userSchema