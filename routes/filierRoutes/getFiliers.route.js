const express = require("express");
const router = express.Router();

const Filier = require("../../models/Filier.model");
const Utilisateur = require("../../models/Utilisateur.model");


router.get('/api/filiers/:id_admin', (req, res) => {
    Utilisateur.findById(req.params.id_admin)
        .then((utilisateur) => {
            if (utilisateur.type == "Gestionnaire") {
                Filier
                    .find({})
                    .populate('niveau')
                    .then((filiers) => {
                        res.send({
                            status: "OK",
                            details: filiers
                                .filter(filier => filier.deleted == false)
                                .map((filier) => {
                                    return {
                                        "_id": filier._id,
                                        "designation": filier.designation,
                                        "niveau": filier.niveau.designation,
                                        "idniveau": filier.niveau._id,
                                    }
                                })
                        });
                    }).catch((err) => {
                        res.send({
                            status: "ERROR",
                            message: 'error lors de chercher les filiers'
                        });
                    })
            }
            else {
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
});

module.exports = router;