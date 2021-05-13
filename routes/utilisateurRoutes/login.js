const express = require('express');
const router = express.Router();
const Utilisateur = require("../../models/Utilisateurs.model");

router.get('/api/utilisateurs', (req, res) => {
    if(req.body.motdepasse != undefined && req.body.email != undefined){
        Utilisateur.find( { email : req.body.email , motdepasse : req.body.motdepasse } )
        .then((utilisateur)=>{
            res.status(200).send({
                status : "OK",
                details : utilisateur
            });
        })
        .catch(()=>{
            res.status(400).send({
                status : "ERROR",
                message : "aucun utilisateur corresponde!!"
            });
        });
    }else{
        res.status(400).send({
            status : "ERROR",
            message : "les champs sont vides!!"
        });
    }
});

module.exports = router;