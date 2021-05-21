const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

//create schemamodel
const AffictationsSchema = new Schema({
    formateur : {type : Schema.Types.ObjectId, ref: "Utilisateur" },
    groupe : {type : Schema.Types.ObjectId, ref: "Groupe" },
},{ timestamps: true })

AffictationsSchema.plugin(mongoose_delete);

const Affectation = mongoose.model( "Affectation" , AffictationsSchema );

module.exports = Affectation;