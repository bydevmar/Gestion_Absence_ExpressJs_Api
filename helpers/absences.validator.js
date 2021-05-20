const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const absenceSchema = Joi.object({
    id_stagiaire : Joi.objectId(),
    id_formateur : Joi.objectId(),
    dateabsence : Joi.date().default(new Date().toJSON()) ,
    heuredebut : Joi.date().required() ,
    heurefin : Joi.date().required() 
});

module.exports = absenceSchema;