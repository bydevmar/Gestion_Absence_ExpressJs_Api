const express = require('express');
const router = express.Router();
const Utilisateur = require("../../models/Utilisateur.model");

router.post('/api/utilisateur', (req, res) => {
    if (req.body.motdepasse != undefined && req.body.email != undefined) {
        Utilisateur.findOne({ email: req.body.email, motdepasse: req.body.motdepasse })
            .then((utilisateur) => {
                if (utilisateur != null) {
                    res.status(200).send({
                        status: "OK",
                        details: utilisateur
                    });
                }else{
                    res.status(200).send({
                        status: "ERROR",
                        message : "aucun utilisateur corresponde!!"
                    });
                }
            })
            .catch(() => {
                res.status(400).send({
                    status: "ERROR",
                    message: "aucun utilisateur corresponde!!"
                });
            });
    } else {
        res.status(400).send({
            status: "ERROR",
            message: "les champs sont vides!!"
        });
    }
});

module.exports = router;