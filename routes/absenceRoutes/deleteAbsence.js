const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absence.model");
const Utilisateur = require("../../models/Utilisateur.model");
const Stagiaire = require("../../models/Stagiaire.model");
const Affectation = require("../../models/Affectation.model");

router.delete('/api/absences/:id_user/:id_absence', (req, res) => {
    Absence.findById(req.params.id_absence)
        .then((absence) => {
            if (absence.deleted == false) {
                Utilisateur.findById(req.params.id_user)
                    .then((user) => {
                        if (user.type == "Gestionnaire") {
                            Stagiaire
                                .findById(absence.stagiaire)
                                .populate("groupe")
                                .then((stagiaire) => {
                                    Affectation
                                    .findOne({ "groupe": stagiaire.groupe._id, "formateur": absence.formateur })
                                        .then((affectation) => {
                                            if (affectation != null) {
                                                absence
                                                    .delete()
                                                    .then(() => {
                                                        res.status(200)
                                                            .send({
                                                                status: "OK",
                                                                message: "absences supprimé avec succès!",
                                                                details: absence
                                                            });
                                                    }).catch(() => {
                                                        res.send({
                                                            status: "ERROR",
                                                            message: "Erreur lors de la suppression!"
                                                        });
                                                    })
                                            } else {
                                                res.send({
                                                    status: "ERROR",
                                                    message: "Vous pouvez pas supprimer l'absence à ce groupe!"
                                                });

                                            }
                                        }).catch(() => {
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
                        } else if (user.type == "Formateur") {
                            Stagiaire
                                .findById(absence.stagiaire)
                                .populate("groupe")
                                .then((stagiaire) => {
                                    Affectation
                                    .findOne({ "groupe": stagiaire.groupe._id, "formateur": absence.formateur })
                                        .then((affectation) => {
                                            if (affectation != null && absence.formateur == req.params.id_user) {
                                                absence
                                                    .delete()
                                                    .then(() => {
                                                        res.status(200)
                                                            .send({
                                                                status: "OK",
                                                                message: "absences supprimé avec succès!",
                                                                details: absence
                                                            });
                                                    }).catch(() => {
                                                        res.send({
                                                            status: "ERROR",
                                                            message: "Erreur lors de la suppression!"
                                                        });
                                                    })
                                            } else {
                                                res.send({
                                                    status: "ERROR",
                                                    message: "Vous pouvez pas supprimer cette absence!"
                                                });

                                            }
                                        }).catch(() => {
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
                            
                        }
                    }).catch(() => {
                        res.send({
                            status: "ERROR",
                            message: "Erreur lors de vérifications de votre identité!"
                        });
                    })
            } else {
                res.send({
                    status: "ERROR",
                    message: "absence n'exist pas!"
                });
            }
        }).catch(() => {
            res.send({
                status: "ERROR",
                message: "Absence Introuvable!"
            });
        })
})

module.exports = router;