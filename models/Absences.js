const mongoose = require("mongoose");
const soft_delete = require('mongoose-softdelete');

const Schema = mongoose.Schema;

const AbsencesSchema = new Schema({
    code_stagiaire : mongoose.string,
    formateur : String,
    dateabsence : Date ,
    heuedebut : Date,
    heurefin :Date
},{ timestamps: true })

AbsencesSchema.plugin(soft_delete);

const Absence = mongoose.model( "Absence" , AbsencesSchema );

//export model
module.exports = Absence;