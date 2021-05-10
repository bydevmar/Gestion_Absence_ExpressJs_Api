const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StagiairesSchema = new Schema({
    numinscription : String ,
    nom:String ,
    prenom : String ,
    code_groupe : String ,
})

const Stagiaire = mongoose.model( "Affectation" , StagiairesSchema );

module.exports = Stagiaire;