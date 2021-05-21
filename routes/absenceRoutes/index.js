const getabsence  = require("./getAbsence.route");
const postabsence = require("./postAbsence.route");
const putabsencebyFormateur = require("./putAbsenceByFormateur.route");
const putabsencebyAdmin = require("./putAbsenceByAdmin.route");
const deleteabsence = require("./deleteAbsence.route");

const routes = [ getabsence , postabsence , putabsencebyFormateur , deleteabsence , putabsencebyAdmin ];

module.exports = routes;