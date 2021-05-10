const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schemamodel
const niveauxSchema = new Schema({
    designation : String
},{ timestamps: true })

const Niveaux = mongoose.model("Niveaux",niveauxSchema);

module.exports = Niveaux;