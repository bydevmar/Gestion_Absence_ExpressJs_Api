const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absence.model");
const Utilisateur = require("../../models/Utilisateur.model");
const Stagiaire = require("../../models/Stagiaire.model");
const Affectation = require("../../models/Affectation.model");
const absenceSchema = require('../../helpers/Absence.validator')


router.put('/api/absences/:id_admin/:id_a', (req, res) => {
    absenceSchema.validateAsync(req.body)
        .then(() => {
            Utilisateur.findById(req.params.id_admin)
                .then( (user) => {
                    if (user.type == "Gestionnaire") {
                        Stagiaire.findById(req.body.stagiaire).populate("groupe")
                            .then((stagiaire) => {
                                Affectation.findOne({ "groupe": stagiaire.groupe._id, "formateur": req.body.formateur })
                                    .then((affectation) => {
                                        if (affectation != null) {
                                            Absence.updateOne({ _id: req.params.id_a }, req.body)
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
                                                status: "ERROR",
                                                message: "Vous pouvez pas modifier l'absence à ce groupe!"
                                            });
                                        }
                                    })
                                    .catch(() => {
                                        res.send({
                                            status: "ERROR",
                                            message: "Erreur lors de modification de cette absence!"
                                        });
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
                            message: "Vos etes pas un administrateur!"
                        });
                    }
                }).catch(() => {
                    res.send({
                        status: "ERROR",
                        message: "Erreur lors de vérifications de votre identité!"
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