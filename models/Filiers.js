const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schemamodel
const filiersSchema = new Schema({
    designation : String,
    code_niveaux : String
},{ timestamps: true })

const Filier = mongoose.model( "Filier" , filiersSchema );

module.exports = Filier;