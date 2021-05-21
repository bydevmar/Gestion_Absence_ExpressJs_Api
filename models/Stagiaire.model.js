const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

const StagiairesSchema = new Schema({
    numinscription : String ,
    nom:String ,
    prenom : String ,
    groupe : {type : Schema.Types.ObjectId, ref: "Groupe" }
},{ timestamps: true })

StagiairesSchema.plugin(mongoose_delete);

const Stagiaire = mongoose.model( "Stagiaire" , StagiairesSchema );

module.exports = Stagiaire;