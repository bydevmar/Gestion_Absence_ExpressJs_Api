const getStagiaire  = require("./getStagiaire.route");
const postStagiaire  = require("./postStagiaire.route");
const putStagiaire  = require("./putStagiaire.route");
const deleteStagiaire  = require("./deleteStagiaire.route");

const routes = [getStagiaire,postStagiaire,putStagiaire,deleteStagiaire]

module.exports = routes;