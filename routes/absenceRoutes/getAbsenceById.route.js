const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absence.model");
const Utilisateur = require("../../models/Utilisateur.model");

router.get('/api/absences/:id_u/:id_absence', (req, res) => {
    Absence
        .findById(req.params.id_absence)
        .populate([{ path: 'stagiaire', populate: { path: 'groupe' } }, "formateur"])
        .then((absence) => {
            if (absence && absence.deleted == false){
                Utilisateur
                    .findById(req.params.id_u)
                    .then((utilisateur) => {
                        if (utilisateur.type == "Formateur" && absence.formateur._id == req.params.id_u) {
                                res.send({
                                    status: "OK",
                                    details: {
                                        "_id": absence._id,
                                        "formateur": absence.formateur._id,
                                        "stagiaire": absence.stagiaire._id,
                                        "numinscription": absence.stagiaire.numinscription,
                                        "nom": absence.stagiaire.nom,
                                        "prenom": absence.stagiaire.prenom,
                                        "designation": absence.stagiaire.groupe.designation,
                                        "annee": absence.stagiaire.groupe.annee,
                                        "dateabsence": absence.dateabsence,
                                        "heuredebut": absence.heuredebut,
                                        "heurefin": absence.heurefin
                                    }
                                });
                        } else if (utilisateur.type == "Gestionnaire") {
                            res.send({
                                status: "OK",
                                details: {
                                    "_id": absence._id,
                                    "formateur": absence.formateur._id,
                                    "stagiaire": absence.stagiaire._id,
                                    "numinscription": absence.stagiaire.numinscription,
                                    "nom": absence.stagiaire.nom,
                                    "prenom": absence.stagiaire.prenom,
                                    "designation": absence.stagiaire.groupe.designation,
                                    "annee": absence.stagiaire.groupe.annee,
                                    "dateabsence": absence.dateabsence,
                                    "heuredebut": absence.heuredebut,
                                    "heurefin": absence.heurefin
                                }
                            });
                        }else{
                            res.send({
                                status: "ERROR",
                                message: "Vous pouvez pas acceseder aux absences!"
                            });
                        }
                    }).catch(() => {
                        res.send({
                            status: "ERROR",
                            message: "Utilisateur introuvable!"
                        });
                    })

            }else{
                res.send({
                    status: "ERROR",
                    message: "Absence introuvable!"
                });
            }


        }).catch(() => {
            res.send({
                status: "ERROR",
                message: "Absence introuvable!"
            });
        })
})
module.exports = router;