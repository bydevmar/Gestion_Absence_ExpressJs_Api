const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

//create schemamodel
const filiersSchema = new Schema({
    designation : String,
    code_niveaux : String
},{ timestamps: true })

filiersSchema.plugin(mongoose_delete);

const Filier = mongoose.model( "Filier" , filiersSchema );

module.exports = Filier;