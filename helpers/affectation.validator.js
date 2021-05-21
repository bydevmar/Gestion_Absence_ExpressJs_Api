const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const affectationSchema = Joi.object({
    formateur : Joi.objectId(),
    groupe : Joi.objectId()
});

module.exports = affectationSchema;
