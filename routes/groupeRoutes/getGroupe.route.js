const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateur.model");
const Groupe = require("../../models/Groupe.model");

router.get('/api/groupe/:id_u/:id_g', (req, res) => {
    Utilisateur
        .findById(req.params.id_u)
        .then(utilisateur => {
            if (utilisateur.type == "Gestionnaire") {
                Groupe
                    .findById(req.params.id_g)
                    .populate("filier")
                    .then(groupe => {
                        if(groupe && groupe.deleted == false){
                            res.send({
                                status: "OK",
                                details: {
                                    "_id": groupe._id,
                                    "designation":groupe.designation,
                                    "annee":groupe.annee,
                                    "filier": groupe.filier.designation,
                                    "idfilier": groupe.filier._id,
                                }
                            });
                        }
                        
                    })
                    .catch(error => {
                        res.send({
                            status: "ERROR",
                            details: error
                        })
                    })
            } else if (utilisateur.type == "Formateur") {
                res.send({
                    status: "OK",
                    message:"vous pouvez pas acceseder aux ces informations!" 
                })
            }               
        }).catch(error => {
            res.send({
                status: "ERROR",
                message: "Administrateur non trouvé!"
            })
        })
});

module.exports = router;