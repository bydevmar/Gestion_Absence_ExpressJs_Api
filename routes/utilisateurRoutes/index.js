
const getUtilisateur  = require("../utilisateurRoutes/getUtilisateurs.route");
const postUtilisateur  = require("../utilisateurRoutes/postUtilisateurs.route");
const putUtilisateur  = require("../utilisateurRoutes/putUtilisateurs.route");
const deleteUtilisateur  = require("../utilisateurRoutes/deleteUtilisateurs.route");

const routes = [getUtilisateur,postUtilisateur,putUtilisateur,deleteUtilisateur]

module.exports = routes;