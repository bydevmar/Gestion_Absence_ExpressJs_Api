const getfilier  = require("../filierRoutes/getFilier.route");
const postfilier  = require("../filierRoutes/postFilier.route");
const putfilier  = require("../filierRoutes/putFilier.route");
const deletefilier  = require("../filierRoutes/deleteFilier.route");

const routes = [getfilier,postfilier,putfilier,deletefilier]

module.exports = routes;