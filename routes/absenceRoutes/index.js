const getAllAbsences  = require("./getAllAbsences.route");
const getAbsenceById  = require("./getAbsenceById.route");
const postabsence = require("./postAbsence.route");
const putabsencebyFormateur = require("./putAbsenceByFormateur.route");
const putabsencebyAdmin = require("./putAbsenceByAdmin.route");
const deleteAbsenceByAdminAndFormateur = require("./deleteAbsenceByAdmin&Formateur.route");

const routes = [ getAllAbsences,
                 getAbsenceById, 
                 postabsence,
                 putabsencebyFormateur,
                 putabsencebyAdmin,
                 deleteAbsenceByAdminAndFormateur
                ];
module.exports = routes;