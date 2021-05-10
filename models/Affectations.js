const mongoose = require("mongoose");
const soft_delete = require('mongoose-softdelete');

const Schema = mongoose.Schema;

//create schemamodel
const AffictationsSchema = new Schema({
    email : String,
    code_groupe : String,
},{ timestamps: true })

AffictationsSchema.plugin(soft_delete);

const Affectation = mongoose.model( "Affectation" , AffictationsSchema );

module.exports = Affectation;