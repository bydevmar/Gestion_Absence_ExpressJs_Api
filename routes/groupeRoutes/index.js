const getgroupe  = require("../groupeRoutes/getGroupe.route");
const postgroupe  = require("../groupeRoutes/postGroupe.route");
const putgroupe  = require("../groupeRoutes/putGroupe.route");
const deletegroupe  = require("../groupeRoutes/deleteGroupe.route");

const routes = [getgroupe,postgroupe,putgroupe,deletegroupe]

module.exports = routes;