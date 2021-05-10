const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schemamodel
const niveauxSchema = new Schema({
    designation : String
})

const Niveaux = mongoose.model("Niveaux",niveauxSchema);

module.exports = Niveaux;