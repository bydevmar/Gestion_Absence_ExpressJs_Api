const Joi = require('joi');

const stagiaireSchema = Joi.object({
    numinscription : Joi.string().min(4).max(60).required() ,
    nom : Joi.string().min(4).max(60).required(),
    prenom : Joi.string().min(4).max(60).required(),
    code_groupe : Joi.string().min(20).max(60).required()
})

module.exports = stagiaireSchema;