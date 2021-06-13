const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateur.model");
const Affectation = require("../../models/Affectation.model");

router.get('/api/affectations/:id_admin', (req, res) => {
    Utilisateur.findById(req.params.id_admin)
        .then((utilisateur) => {
            if (utilisateur.type == "Gestionnaire") {
                Affectation
                    .find({})
                    .populate(["formateur","groupe"])
                    .then((affectations) => {
                        res.send({
                            status: "OK",
                            details: affectations
                                .filter(affectation => affectation.deleted == false)
                                .map((affectation) => {
                                    return {
                                        "_id": affectation._id,
                                        "formateur": affectation.formateur.nom +" " +affectation.formateur.prenom,
                                        "idformateur": affectation.formateur._id,
                                        "groupe":affectation.groupe.designation,
                                        "idgroupe": affectation.groupe._id,
                                        "annee":affectation.groupe.annee,
                                    }
                                })
                        });
                    }).catch((err) => {
                        res.send({
                            status: "ERROR",
                            message: 'error lors de chercher des affectations'
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