const getAllAbsencesByFotmateurAndByAdmin  = require("./getAllAbsencesByFotmateurAndByAdmin.route");
const postabsence = require("./postAbsence.route");
const putabsencebyFormateur = require("./putAbsenceByFormateur.route");
const putabsencebyAdmin = require("./putAbsenceByAdmin.route");
const deleteAbsenceByFormateur = require("./deleteAbsenceByFormateur.route");
const deleteAbsenceByAdmin = require("./deleteAbsenceByAmin.route");

const routes = [ getAllAbsencesByFotmateurAndByAdmin , postabsence , putabsencebyFormateur , 
                deleteAbsenceByFormateur , putabsencebyAdmin , 
                deleteAbsenceByAdmin];

module.exports = routes;