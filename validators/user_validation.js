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
            .alphanum()
            .required()
            .unique()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required()
})

module.exports = userSchema