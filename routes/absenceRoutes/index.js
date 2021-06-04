const getAllAbsencesByFotmateurAndByAdmin  = require("./getAllAbsencesByFotmateurAndByAdmin.route");
const postabsence = require("./postAbsence.route");
const putabsencebyFormateur = require("./putAbsenceByFormateur.route");
const putabsencebyAdmin = require("./putAbsenceByAdmin.route");
const deleteAbsenceByAdminAndFormateur = require("./deleteAbsenceByAdmin&Formateur.route");

const routes = [ getAllAbsencesByFotmateurAndByAdmin , postabsence , 
                putabsencebyFormateur , putabsencebyAdmin , 
                deleteAbsenceByAdminAndFormateur];

module.exports = routes;