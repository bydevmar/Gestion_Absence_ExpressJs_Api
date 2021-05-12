const Joi = require('joi');

const filierSchema = Joi.object({
    designation : Joi.string().min(3).required(),
    id_niveau : Joi.string().min(4).required()
});

module.exports = filierSchema;