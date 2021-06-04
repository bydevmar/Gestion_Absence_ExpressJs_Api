const getfilier  = require("./getFilier.route");
const getfiliers  = require("./getFiliers.route");
const postfilier  = require("./postFilier.route");
const putfilier  = require("./putFilier.route");
const deletefilier  = require("./deleteFilier.route");

const routes = [getfilier,postfilier,putfilier,deletefilier,getfiliers ]

module.exports = routes;