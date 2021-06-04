const getniveau  = require("./getNiveau.route");
const getniveaux  = require("./getNiveaux.route");
const postniveau  = require("./postNiveau.route");
const putniveau  = require("./putNiveau.route");
const deleteniveau  = require("./deleteNiveau.route");

const routes = [getniveau,postniveau,putniveau,deleteniveau,getniveaux]

module.exports = routes;