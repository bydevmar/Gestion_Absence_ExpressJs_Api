const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absence.model");
const Utilisateur = require("../../models/Utilisateur.model");
const Stagiaire = require("../../models/Stagiaire.model");
const Affectation = require("../../models/Affectation.model");
const absenceSchema = require('../../helpers/Absence.validator')


router.delete('/api/absences/:id_a', (req, res) => {
    absenceSchema.validateAsync(req.body)
        .then(() => {
            Utilisateur.findById(req.body.formateur)
                .then(async (user) => {
                    if (user.type == "Formateur") {
                        Stagiaire.findById(req.body.stagiaire).populate("groupe")
                            .then((stagiaire) => {
                                Affectation.findOne({ "groupe": stagiaire.groupe._id, "formateur": req.body.formateur })
                                    .then((affectation) => {
                                        if (affectation != null) {
                                            Absence.findById(req.params.id_a)
                                                .then((absence) => {
                                                    if (absence.deleted == false) {
                                                        absence.delete()
                                                            .then(() => {
                                                                res.status(200)
                                                                    .send({
                                                                        status: "OK",
                                                                        message: "absences supprimé avec succès!",
                                                                        details: req.body
                                                                    });
                                                            })
                                                            .catch(() => {
                                                                res.send({
                                                                    status: "ERROR",
                                                                    message: "Erreur lors de la suppression!"
                                                                });
                                                            })
                                                    }
                                                    else {
                                                        res.send({
                                                                status: "ERROR",
                                                                message: "absence déjà supprime!",
                                                                details: req.body
                                                            });
                                                    }
                                                })

                                        } else {
                                            res.send({
                                                status: "ERROR",
                                                message: "Vous pouvez pas supprimer l'absence à ce groupe!"
                                            });
                                        }
                                    })
                                    .catch(() => {
                                        res.send({
                                            status: "ERROR",
                                            message: "Erreur lors de suppression de cette absence!"
                                        });
                                    })
                            }).catch(() => {
                                res.send({
                                    status: "ERROR",
                                    message: "Aucun stagiaire avec ce ID!"
                                });
                            })
                    }else{
                        res.send({
                            status: "ERROR",
                            message: "Vos etez pas un formateur!"
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