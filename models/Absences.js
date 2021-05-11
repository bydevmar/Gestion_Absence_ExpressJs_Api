const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

const AbsencesSchema = new Schema({
    id_stagiaire : String,
    id_formateur : String,
    dateabsence : Date , //on peut applique la data d'aujourd'hui by default
    heuredebut : Date,
    heurefin :Date
},{ timestamps: true })

AbsencesSchema.plugin(mongoose_delete);

const Absence = mongoose.model( "Absence" , AbsencesSchema );

//export model
module.exports = Absence;