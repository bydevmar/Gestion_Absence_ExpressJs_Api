const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

//create schemamodel
const niveauxSchema = new Schema({
    designation : String
},{ timestamps: true })

niveauxSchema.plugin(mongoose_delete);

const Niveau = mongoose.model("Niveau",niveauxSchema);

module.exports = Niveau;