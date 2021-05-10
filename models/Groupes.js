const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schemamodel
const GroupesSchema = new Schema({
    designation : String,
    annee : String,
    code_filier : String
},{ timestamps: true })

AffictationsSchema.plugin(soft_delete);

const Groupe = mongoose.model( "Groupe" , GroupesSchema );

module.exports = Groupe;