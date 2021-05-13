const getniveau  = require("../niveauRoutes/getNiveau.route");
const postniveau  = require("../niveauRoutes/postNiveau.route");
const putniveau  = require("../niveauRoutes/putNiveau.route");
const deleteniveau  = require("../niveauRoutes/deleteNiveau.route");

const routes = [getniveau,postniveau,putniveau,deleteniveau]

module.exports = routes;