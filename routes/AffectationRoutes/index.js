const getaffectations  = require("./getAffectations.route");
const getaffectation  = require("./getAffectation.route");
const postaffectation  = require("./postAffectation.route");
const putaffectation  = require("./putAffectation.route");
const deleteaffectation  = require("./deleteAffectation.route");

const routes = [getaffectations,getaffectation,postaffectation,putaffectation,deleteaffectation]

module.exports = routes;