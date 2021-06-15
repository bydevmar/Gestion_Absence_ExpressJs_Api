const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absence.model");
const Utilisateur = require("../../models/Utilisateur.model");
const Stagiaire = require("../../models/Stagiaire.model");
const Affectation = require("../../models/Affectation.model");
const absenceSchema = require('../../helpers/Absence.validator')

router.put('/api/absences/:id_utilisateur/:id_absence', (req, res) => {
    absenceSchema.validateAsync(req.body)
        .then(() => {
            Absence.findById(req.params.id_absence)
                .then(absence => {
                    if (absence) {
                        Stagiaire.findById(req.body.stagiaire).populate("groupe")
                            .then((stagiaire) => {
                                Affectation.findOne({ "groupe": stagiaire.groupe._id, "formateur": req.body.formateur })
                                    .then(affectation => {
                                        if (affectation != null) {
                                            Utilisateur.findById(req.params.id_utilisateur)
                                                .then((utilisateur) => {
                                                    if (utilisateur.type == "Gestionnaire") {
                                                        Absence.updateOne({ _id: req.params.id_absence }, req.body)
                                                            .then(() => {
                                                                res.status(200)
                                                                    .send({
                                                                        status: "OK",
                                                                        message: "absences modifié avec succès!",
                                                                        details: req.body
                                                                    });
                                                            })
                                                    } else if (utilisateur.type == "Formateur" && utilisateur._id == req.body.formateur && req.body.formateur == req.params.id_utilisateur) {
                                                        Absence.updateOne({ _id: req.params.id_absence }, req.body)
                                                            .then(() => {
                                                                res.status(200)
                                                                    .send({
                                                                        status: "OK",
                                                                        message: "absences modifié avec succès!",
                                                                        details: req.body
                                                                    });
                                                            })
                                                    } else {
                                                        res.send({
                                                            status: "OK",
                                                            message: "vous pouvez pas modifier cette absence"
                                                        })
                                                    }
                                                }).catch(err => {
                                                    res.send({
                                                        status: "OK",
                                                        message: "vous pouvez pas modifier cette absence"
                                                    })
                                                })
                                        }
                                    }).catch(err => {
                                        res.send({
                                            status: "ERROR",
                                            message: "Affectation non trouvé!"
                                        })
                                    })

                            }).catch(() => {
                                res.send({
                                    status: "ERROR",
                                    message: "Aucun stagiaire avec ce ID!"
                                });
                            })
                    }
                    else {
                        res.send({
                            status: "ERROR",
                            message: "absence Introuvable!"
                        });
                    }
                }).catch(() => {
                    res.send({
                        status: "ERROR",
                        message: "Erreur lors de la recherche d'absence!"
                    });
                })

        }).catch((error) => {
            res.send({
                status: "ERROR",
                message: error.details[0].message
            });
        })
})

module.exports = router;