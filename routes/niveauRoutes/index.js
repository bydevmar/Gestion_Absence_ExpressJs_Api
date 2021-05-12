const getniveau  = require("../niveauRoutes/getNiveaux.route");
const postniveau  = require("../niveauRoutes/postNiveaux.route");
const putniveau  = require("../niveauRoutes/putNiveaux.route");
const deleteniveau  = require("../niveauRoutes/deleteNiveaux.route");

const routes = [getniveau,postniveau,putniveau,deleteniveau]

module.exports = routes;