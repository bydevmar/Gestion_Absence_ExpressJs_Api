const getAllAbsences  = require("./getAllAbsences.route");
const getAbsenceById  = require("./getAbsenceById.route");
const postabsence = require("./postAbsence.route");
const putAbsence = require("./putAbsence.route");
const deleteAbsence = require("./deleteAbsence");

const routes = [ getAllAbsences,
                 getAbsenceById, 
                 postabsence,
                 putAbsence,
                 deleteAbsence
                ];
module.exports = routes;