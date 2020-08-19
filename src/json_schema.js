const Joi = require('@hapi/joi')

const schema = Joi.object({
    parms: Joi.string().required()
})

module.exports = schema