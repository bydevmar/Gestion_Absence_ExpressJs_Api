const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absence.model");
const Utilisateur = require("../../models/Utilisateur.model");
const Stagiaire = require("../../models/Stagiaire.model");
const Affectation = require("../../models/Affectation.model");
const absenceSchema = require('../../helpers/Absence.validator')

router.post('/api/absences/:id_u', (req, res) => {
    absenceSchema.validateAsync(req.body)
        .then(() => {
            Stagiaire.findById(req.body.stagiaire).populate("groupe")
                .then((stagiaire) => {
                    Affectation.findOne({ "groupe" : stagiaire.groupe._id , "formateur" : req.body.formateur })
                        .then((affectation) => {
                            if (affectation != null) {
                                Utilisateur.findById(req.params.id_u)
                                    .then((user) => {
                                        if (user.type == "Gestionnaire") {
                                            Absence.create(req.body)//check if "absence" already exists later 
                                                .then((absence) => {
                                                    res.send({
                                                        status: "OK",
                                                        message: "absence ajouté avec succès!",
                                                        details: absence
                                                    });
                                                })
                                        } else if (user.type == "Formateur" && req.params.id_u == req.body.formateur) {
                                            Absence.create(req.body)//check if "absence" already exists later 
                                                .then((absence) => {
                                                    res.send({
                                                        status: "OK",
                                                        message: "absence ajouté avec succès!",
                                                        details: absence
                                                    });
                                                })
                                        }
                                    }).catch(() => {
                                        res.send({
                                            status: "ERROR",
                                            message: "Utilisateur non trouvable!!"
                                        });
                                    })
                            }else{
                                res.send({
                                    status: "ERROR",
                                    message: "Utilisateur non responsable de ce groupe!"
                                });
                            }
                        }).catch(() => {
                            res.send({
                                status: "ERROR",
                                message: "Ce formateur n'est pas responsable de ce groupe!"
                            });
                        })
                }).catch(() => {
                    res.send({
                        status: "ERROR",
                        message: "Stagiaire non trouvable!"
                    });
                })
        }).catch((err) => {
            res.send({
                status: "ERROR",
                message: err.details[0].message
            });
        })
})

module.exports = router;