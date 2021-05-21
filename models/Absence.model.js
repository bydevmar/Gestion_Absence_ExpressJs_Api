const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoose_delete = require('mongoose-delete');

const AbsencesSchema = new Schema({
    stagiaire : {type : Schema.Types.ObjectId, ref: "Stagiaire" },
    formateur : {type : Schema.Types.ObjectId, ref: "Utilisateur" },
    dateabsence: Date, //on peut applique la data d'aujourd'hui by default
    heuredebut: Date,
    heurefin: Date
}, { timestamps: true })

AbsencesSchema.plugin(mongoose_delete);

const Absence = mongoose.model("Absence", AbsencesSchema);

//export model
module.exports = Absence;