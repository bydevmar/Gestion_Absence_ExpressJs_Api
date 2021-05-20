const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

//create schemamodel
const filiersSchema = new Schema({
    designation : String,
    id_niveau : {type : Schema.Types.ObjectId, ref: "Niveau" }
},{ timestamps: true })

filiersSchema.plugin(mongoose_delete);

const Filier = mongoose.model( "Filier" , filiersSchema );

module.exports = Filier;