const Joi = require('joi');

const absenceSchema = Joi.object({
    id_stagiaire : Joi.string().required(),
    id_formateur : Joi.string().required(),
    dateabsence : Joi.date().default(new Date().toJSON()) ,
    heuredebut : Joi.date().required() ,
    heurefin : Joi.date().required() 
});

module.exports = absenceSchema;







