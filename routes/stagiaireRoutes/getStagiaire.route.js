const express = require("express");
const router = express.Router();

const Stagiaire = require("../../models/Stagiaire.model");
const Utilisateur = require("../../models/Utilisateur.model");
const Affectation = require("../../models/Affectation.model");

router.get('/api/stagiaires/:id_u', (req, res) => {
    let groupes = [];
    Utilisateur
        .findById(req.params.id_u)
        .then(utilisateur => {
            if (utilisateur.type == "Gestionnaire") {
                Stagiaire
                    .find({})
                    .populate("groupe")
                    .then(stagiaires => {
                        res.send({
                            status: "OK",
                            details: stagiaires
                                .filter(stagiaire => stagiaire.deleted == false)
                                .map((stagiaire) => {
                                    return {
                                        "_id": stagiaire._id,
                                        "numinscription": stagiaire.numinscription,
                                        "nom": stagiaire.nom,
                                        "prenom": stagiaire.prenom,
                                        "idgroupe": stagiaire.groupe._id,
                                        "nomgroupe": stagiaire.groupe.designation,
                                        "annee": stagiaire.groupe.annee
                                    }
                                })
                        });
                    })
                    .catch(error => {
                        res.send({
                            status: "ERROR",
                            details: error
                        })
                    })
            } else if (utilisateur.type == "Formateur") {
                Affectation.find({ "formateur": req.params.id_u })
                    .then((affectations) => {
                        affectations.map(affectation => {
                            groupes.push(affectation.groupe.toString())
                        })
                    })
                    .then(() => {
                        Stagiaire
                            .find({})
                            .populate("groupe")
                            .then(stagiaires => {
                                res.send({
                                    status: "OK",
                                    details: stagiaires
                                        .filter(stagiaire => (groupes.includes(stagiaire.groupe._id.toString()) && stagiaire.deleted == false))
                                        .map((stagiaire) => {
                                            return {
                                                "_id": stagiaire._id,
                                                "numinscription": stagiaire.numinscription,
                                                "nom": stagiaire.nom,
                                                "prenom": stagiaire.prenom,
                                                "idgroupe": stagiaire.groupe._id,
                                                "nomgroupe": stagiaire.groupe.designation,
                                                "annee": stagiaire.groupe.annee
                                            }
                                        })
                                });
                            })
                    })
                    .catch(error => {
                        res.send({
                            status: "ERROR",
                            details: "Aucun affectation ne corresponde!"
                        })
                    })
            }
        }).catch(error => {
            res.send({
                status: "ERROR",
                details: "error utilisateur"
            })
        })
});

module.exports = router;