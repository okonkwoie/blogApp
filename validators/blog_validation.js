const Joi = require('joi')

const blogSchema = Joi.object({
    title: Joi.string()
              .min(5)
              .max(200)
              .required(),
    body: Joi.string()
              .min(10)
              .max(200)
              .required(),
    description: Joi.string(),
    author: Joi.string(),
    tags: Joi.array()
              .items(Joi.string()),
    timestamp: Joi.date(),
    readCount: Joi.number(),
    readingTime: Joi.number(),
    state: Joi.string()
})

module.exports = blogSchema

// async function blogValidatorMW(req, res, next){
//      const blogPayLoad = req.body

//      try {
//         await blogSchema.validateAsync(blogPayLoad)
//         next()
//     } catch (error) {
//         next({
//             message: error.details[0].message,
//             status: 400
//         })
//     }
// }

