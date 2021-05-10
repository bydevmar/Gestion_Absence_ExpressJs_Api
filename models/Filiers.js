const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schemamodel
const filiersSchema = new Schema({
    designation : String
})

const Filier = mongoose.model( "Filier" , filiersSchema );

module.exports = Filier;