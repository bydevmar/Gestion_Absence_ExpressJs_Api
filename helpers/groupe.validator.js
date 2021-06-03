const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const groupeSchema = Joi.object({
    designation : Joi.string().min(4).max(60).required(),
    annee : Joi.number().min(1).max(3).required(),
    filier : Joi.objectId()
})

module.exports = groupeSchema;