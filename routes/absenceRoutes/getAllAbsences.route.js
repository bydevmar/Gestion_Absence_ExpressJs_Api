const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absence.model");
const Utilisateur = require("../../models/Utilisateur.model");

router.get('/api/absences/:id_u', (req, res) => {
    Absence
        .find({})
        .populate([{ path: 'stagiaire', populate: { path: 'groupe' } }, "formateur"])
        .then((absences) => {
            Utilisateur
                .findById(req.params.id_u)
                .then((utilisateur) => {
                    if (utilisateur.type == "Formateur") {
                        res.send({
                            status: "OK",
                            details:
                                absences
                                    .filter(absence => (absence.formateur._id == req.params.id_u && absence.deleted == false))
                                    .map((absence) => {
                                        return {
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
                                    })
                        });
                    } else if (utilisateur.type == "Gestionnaire") {
                        res
                            .send({
                                status: "OK",
                                details: absences
                                    .filter(absence => (absence.deleted == false))
                                    .map((absence) => {
                                        return {
                                            "_id": absence._id,
                                            "formateur": absence.formateur._id,
                                            "stagiaire": absence.stagiaire._id,
                                            "numinscription": absence.stagiaire.numinscription,
                                            "nom": absence.stagiaire.nom,
                                            "prenom": absence.stagiaire.prenom,
                                            "nomformateur": absence.formateur.nom,
                                            "prenomformateur": absence.formateur.prenom,
                                            "designation": absence.stagiaire.groupe.designation,
                                            "annee": absence.stagiaire.groupe.annee,
                                            "dateabsence": absence.dateabsence,
                                            "heuredebut": absence.heuredebut,
                                            "heurefin": absence.heurefin
                                        }
                                    })

                            });
                    }
                }).catch(() => {
                    res.send({
                        status: "ERROR",
                        message: "Utilisateur introuvable!"
                    });
                })

        }).catch(() => {
            res.send({
                status: "ERROR",
                message: "Absence introuvable!"
            });
        })
})
module.exports = router;