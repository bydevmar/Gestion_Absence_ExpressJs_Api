const getaffectation  = require("../affectationRoutes/getAffectation.route");
const postaffectation  = require("../affectationRoutes/postAffectation.route");
const putaffectation  = require("../affectationRoutes/putAffectation.route");
const deleteaffectation  = require("../affectationRoutes/deleteAffectation.route");

const routes = [getaffectation,postaffectation,putaffectation,deleteaffectation]

module.exports = routes;