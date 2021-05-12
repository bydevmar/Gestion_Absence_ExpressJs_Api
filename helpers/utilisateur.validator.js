const Joi = require('joi');

const utilisateurSchema = Joi.object({
    email : Joi.string().email().required(),
    nom : Joi.string().min(4).max(60).required(),
    prenom : Joi.string().min(4).max(60).required(),
    matricule : Joi.string().min(4).required(),
    cin : Joi.string().min(5).max(10).required(),
    motdepasse : Joi.string().min(8).max(60).required(),
    type : Joi.string().valid("Formateur","Gestionnaire").required()
})

module.exports = utilisateurSchema;