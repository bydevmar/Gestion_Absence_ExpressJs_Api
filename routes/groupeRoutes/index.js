const getgroupe  = require("./getGroupe.route");
const getgroupes  = require("./getGroupes.route");
const postgroupe  = require("./postGroupe.route");
const putgroupe  = require("./putGroupe.route");
const deletegroupe  = require("./deleteGroupe.route");

const routes = [getgroupe,postgroupe,putgroupe,deletegroupe,getgroupes]

module.exports = routes;