const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

//create schemamodel
const niveauSchema = new Schema({
    designation : String
},{ timestamps: true })

niveauSchema.plugin(mongoose_delete);

const Niveau = mongoose.model("Niveau",niveauSchema);

module.exports = Niveau;