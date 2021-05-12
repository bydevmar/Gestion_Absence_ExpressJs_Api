const Joi = require('joi');

const groupeSchema = Joi.object({
    designation : Joi.string().min(4).max(60).required(),
    annee : Joi.string().min(4).max(10).required(),
    id_filier : Joi.string().required()
})

module.exports = groupeSchema;