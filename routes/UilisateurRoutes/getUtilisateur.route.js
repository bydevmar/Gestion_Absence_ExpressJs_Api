const express = require('express');
const router = express.Router();
const Utilisateur = require("../../models/Utilisateur.model");

router.post('/api/utilisateur', (req, res) => {
    if (req.body.motdepasse != undefined && req.body.email != undefined) {
        Utilisateur.findOne({ email: req.body.email, motdepasse: req.body.motdepasse })
            .then((utilisateur) => {
                if (utilisateur != null) {
                    if(utilisateur.deleted == false){
                        res.status(200).send({
                            status: "OK",
                            details: utilisateur,
                            message : "vous avez réussi à vous connecter!"
                        });
                    }else{
                        res.status(200).send({
                            status: "ERROR",
                            message 
                        });
                    }
                    
                }else{
                    res.status(200).send({
                        status: "ERROR",
                        message : "aucun utilisateur corresponde!!"
                    });
                }
            })
            .catch(() => {
                res.send({
                    status: "ERROR",
                    message: "aucun utilisateur corresponde!!"
                });
            });
    } else {
        res.send({
            status: "ERROR",
            message: "les champs sont vides!!"
        });
    }
});

module.exports = router;