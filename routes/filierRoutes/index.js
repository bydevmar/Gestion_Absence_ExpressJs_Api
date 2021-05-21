const getfilier  = require("./getFilier.route");
const postfilier  = require("./postFilier.route");
const putfilier  = require("./putFilier.route");
const deletefilier  = require("./deleteFilier.route");

const routes = [getfilier,postfilier,putfilier,deletefilier]

module.exports = routes;