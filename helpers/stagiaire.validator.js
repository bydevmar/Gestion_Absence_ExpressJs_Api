const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi) 

const stagiaireSchema = Joi.object({
    numinscription : Joi.string().min(4).max(60).required() ,
    nom : Joi.string().min(4).max(60).required(),
    prenom : Joi.string().min(4).max(60).required(),
    groupe : Joi.objectId()
})

module.exports = stagiaireSchema;