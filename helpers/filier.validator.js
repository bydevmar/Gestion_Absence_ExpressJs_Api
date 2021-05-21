const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const filierSchema = Joi.object({
    designation : Joi.string().min(3).required(),
    niveau : Joi.objectId()
});

module.exports = filierSchema;