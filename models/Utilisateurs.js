const mongoose = require("mongoose");
const soft_delete = require('mongoose-softdelete');

const Schema = mongoose.Schema;

//create schemamodel
const utilisateurSchema = new Schema({
    email : String,
    nom : String,
    prenom : String,
    matricule : String,
    cin : String,
    motdepasse : String,
    type : String
},{ timestamps: true })

utilisateurSchema.plugin(soft_delete);

const Utilisateur = mongoose.model("Utilisateur",utilisateurSchema);

module.exports = Utilisateur;