const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const groupeSchema = Joi.object({
    designation : Joi.string().min(4).max(60).required(),
    annee : Joi.string().min(4).max(10).required(),
    filier : Joi.objectId()
})

module.exports = groupeSchema;