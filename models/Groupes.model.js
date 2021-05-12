const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

//create schemamodel
const GroupesSchema = new Schema({
    designation : String,
    annee : String,
    id_filier : String
},{ timestamps: true })

GroupesSchema.plugin(mongoose_delete);

const Groupe = mongoose.model( "Groupe" , GroupesSchema );

module.exports = Groupe;