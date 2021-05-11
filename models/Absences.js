const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

const AbsencesSchema = new Schema({
    code_stagiaire : mongoose.string,
    formateur : String,
    dateabsence : Date ,
    heuedebut : Date,
    heurefin :Date
},{ timestamps: true })

AbsencesSchema.plugin(mongoose_delete);

const Absence = mongoose.model( "Absence" , AbsencesSchema );

//export model
module.exports = Absence;