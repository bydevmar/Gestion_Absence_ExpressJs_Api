const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schemamodel
const AffictationsSchema = new Schema({
    email : String,
    code_groupe : String,
})

const Affectation = mongoose.model( "Affectation" , AffictationsSchema );

module.exports = Affectation;