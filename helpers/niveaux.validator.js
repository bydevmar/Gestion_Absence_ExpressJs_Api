const Joi = require('joi');

const niveauSchema = Joi.object({
    designation : Joi.string().required()
})

module.exports = niveauSchema;