const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

//create schemamodel
const utilisateurSchema = new Schema({
    email : String,
    nom : String,
    prenom : String,
    matricule : String,
    cin : String,
    motdepasse : String,
    type : String
},{ timestamps: true });

utilisateurSchema.plugin(mongoose_delete);

const Utilisateur = mongoose.model("Utilisateur",utilisateurSchema);

module.exports = Utilisateur;