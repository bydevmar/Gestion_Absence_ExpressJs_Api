const getStagiaire  = require("../stagiaireRoutes/getStagiaire.route");
const postStagiaire  = require("../stagiaireRoutes/postStagiaire.route");
const putStagiaire  = require("../stagiaireRoutes/putStagiaire.route");
const deleteStagiaire  = require("../stagiaireRoutes/deleteStagiaire.route");

const routes = [getStagiaire,postStagiaire,putStagiaire,deleteStagiaire]

module.exports = routes;