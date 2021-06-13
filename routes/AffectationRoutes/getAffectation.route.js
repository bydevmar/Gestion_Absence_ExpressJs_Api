const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateur.model");
const Affectation = require("../../models/Affectation.model");

router.get('/api/affectation/:id_admin/:id_affectation', (req, res) => {
    Utilisateur.findById(req.params.id_admin)
        .then((utilisateur) => {
            if (utilisateur.type == "Gestionnaire") {
                Affectation
                    .findOne({_id :req.params.id_affectation})
                    .populate(["formateur","groupe"])
                    .then((affectation) => {
                        if(affectation && affectation.deleted == false){
                            res.send({
                                status: "OK",
                                details: {
                                            "_id": affectation._id,
                                            "formateur": affectation.formateur.nom +" " +affectation.formateur.prenom,
                                            "idformateur": affectation.formateur._id,
                                            "groupe":affectation.groupe.designation,
                                            "idgroupe": affectation.groupe._id,
                                            "annee":affectation.groupe.annee,
                                        }
                            });
                        }else{
                            res.send({
                                status: "ERROR",
                                message: "aucun affectation corresponde!"
                            });
                        }
                        
                    }).catch((err) => {
                        res.send({
                            status: "ERROR",
                            message: 'error lors de la recherche des affectations'
                        });
                    })
            }
            else {
                res.send({
                    status: "ERROR",
                    message: "excusez moi vous etes pas un administrateur!"
                });
            }
        }).catch(() => {
            res.send({
                status: "ERROR",
                message: "aucun compte corresponde!"
            });
        })
});

module.exports = router;