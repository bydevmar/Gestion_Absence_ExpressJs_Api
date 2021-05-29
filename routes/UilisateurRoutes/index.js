const getUtilisateurs  = require("./getUtilisateur.route");
const postUtilisateur  = require("./postUtilisateurs.route");
const putUtilisateur  = require("./putUtilisateurs.route");
const deleteUtilisateur  = require("./deleteUtilisateurs.route");
const getUtilisateur = require("./getUtilisateur.route")
const getAllFormateurs = require("./getAllFormateurs.route")

const routes = [getUtilisateurs,postUtilisateur,putUtilisateur,deleteUtilisateur,getUtilisateur,getAllFormateurs]

module.exports = routes;