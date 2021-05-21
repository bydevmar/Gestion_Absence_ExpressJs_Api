const getUtilisateurs  = require("../utilisateurRoutes/getUtilisateurs.route");
const postUtilisateur  = require("../utilisateurRoutes/postUtilisateurs.route");
const putUtilisateur  = require("../utilisateurRoutes/putUtilisateurs.route");
const deleteUtilisateur  = require("../utilisateurRoutes/deleteUtilisateurs.route");
const getUtilisateur = require("./getUtilisateur.route")

const routes = [getUtilisateurs,postUtilisateur,putUtilisateur,deleteUtilisateur,getUtilisateur]

module.exports = routes;