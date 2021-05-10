const mongoose = require("mongoose");

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
})

const Utilisateur = mongoose.model("Utilisateur",utilisateurSchema);

module.exports = Utilisateur;