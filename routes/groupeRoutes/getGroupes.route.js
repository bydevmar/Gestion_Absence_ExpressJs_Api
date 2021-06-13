const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateur.model");
const Affectation = require("../../models/Affectation.model");
const Groupe = require("../../models/Groupe.model");

router.get('/api/groupes/:id_u', (req, res) => {
    let groups = [];
    Utilisateur
        .findById(req.params.id_u)
        .then(utilisateur => {
            if (utilisateur.type == "Gestionnaire") {
                Groupe
                    .find({})
                    .populate("filier")
                    .then(groupes => {
                        res.send({
                            status: "OK",
                            details: groupes
                                .filter(groupe => groupe.deleted == false)
                                .map((groupe) => {
                                    return {
                                        "_id": groupe._id,
                                        "designation":groupe.designation,
                                        "annee":groupe.annee,
                                        "filier": groupe.filier.designation,
                                        "idfilier": groupe.filier._id,
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
                            groups.push(affectation.groupe.toString())
                        })
                    })
                    .then(() => {
                        Groupe
                            .find({})
                            .populate("filier")
                            .then(groupes => {
                                res.send({
                                    status: "OK",
                                    details: groupes
                                        .filter(groupe => (groups.includes(groupe._id.toString()) && groupe.deleted == false))
                                        .map((groupe) => {
                                            return {
                                                "_id": groupe._id,
                                                "designation":groupe.designation,
                                                "annee":groupe.annee,
                                                "filier": groupe.filier.designation,
                                                "idfilier": groupe.filier._id,
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
                details: "Error lors la vérifications d'utilisateur!"
            })
        })
});

module.exports = router;