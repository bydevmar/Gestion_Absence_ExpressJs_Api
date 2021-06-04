const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateur.model");

router.get('/api/formateurs/:id_admin/:id_u', (req, res) => {
    Utilisateur.findById(req.params.id_admin)
        .then((administrateur) => {
            if (administrateur.type == "Gestionnaire") {
                Utilisateur.findOne({ _id: req.params.id_u })
                    .then((formateur) => {
                        if (formateur.type == "Formateur") {
                            if (formateur.deleted == true) {
                                res.status(200).send({
                                    status: "ERROR",
                                    message: "Ce formateur est déjà supprimé!"
                                });
                            }
                            else {
                                res.status(200).send({
                                    status: "OK",
                                    message: "Formateur trouvé avec succès!",
                                    details: formateur
                                });
                            }
                        }
                        else {
                            res.status(200).send({
                                status: "ERROR",
                                message: "ce ID n'est pas pour un Formateur!",
                            });
                        }
                    }).catch((err) => {
                        res.send({
                            status: "ERROR",
                            message: "Formateur non trouvable!"
                        })
                    })
            } else {
                res.send({
                    status: "ERROR",
                    message: "excusez moi vous etes pas un administrateur!"
                });
            }
        }).catch(() => {
            res.send({
                status: "ERROR",
                message: "aucun compte corresponde!"
            });
        })
})

module.exports = router;