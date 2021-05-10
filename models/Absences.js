const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const AbsencesSchema = new Schema({
    code_stagiaire : mongoose.string,
    formateur : String,
    dateabsence : Date ,
    heuedebut : Date,
    heurefin :Date
})

const Absence = mongoose.model( "Absence" , AbsencesSchema );

//export model
module.exports = Absence;