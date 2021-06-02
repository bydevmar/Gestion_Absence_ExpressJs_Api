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
                    .then(groupes => {
                        res.send({
                            status: "OK",
                            details: groupes
                                .filter(groupe => groupe.deleted == false)
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
                            .then(groupes => {
                                res.send({
                                    status: "OK",
                                    details: groupes
                                        .filter(groupe => (groups.includes(groupe._id.toString()) && groupe.deleted == false))
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