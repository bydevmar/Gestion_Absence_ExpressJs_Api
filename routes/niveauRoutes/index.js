const getniveau  = require("./getNiveau.route");
const postniveau  = require("./postNiveau.route");
const putniveau  = require("./putNiveau.route");
const deleteniveau  = require("./deleteNiveau.route");

const routes = [getniveau,postniveau,putniveau,deleteniveau]

module.exports = routes;