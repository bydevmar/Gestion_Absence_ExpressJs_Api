const mongoose = require("mongoose");
const soft_delete = require('mongoose-softdelete');

const Schema = mongoose.Schema;

const StagiairesSchema = new Schema({
    numinscription : String ,
    nom:String ,
    prenom : String ,
    code_groupe : String ,
},{ timestamps: true })

StagiairesSchema.plugin(soft_delete);

const Stagiaire = mongoose.model( "Affectation" , StagiairesSchema );

module.exports = Stagiaire;