const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const affectationSchema = Joi.object({
    id_formateur : Joi.objectId(),
    id_groupe : Joi.objectId()
});

module.exports = affectationSchema;
