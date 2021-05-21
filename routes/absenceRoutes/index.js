const getabsence  = require("./getAbsence.route");
const postabsence  = require("./postAbsence.route");
const putabsence  = require("./putAbsenceByFormateur.route");
const deleteabsence  = require("./deleteAbsence.route");

const routes = [getabsence,postabsence,putabsence,deleteabsence];

module.exports = routes;