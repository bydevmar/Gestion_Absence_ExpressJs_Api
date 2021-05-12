const Joi = require('joi');

const affectationSchema = Joi.object({
    id_formateur : Joi.string().required(),
    id_groupe : Joi.string().required()
});

module.exports = affectationSchema;
