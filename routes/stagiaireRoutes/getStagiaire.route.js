const express = require("express");
const router = express.Router();

const Stagiaire = require("../../models/Stagiaire.model");
const Utilisateur = require("../../models/Utilisateur.model");
const stagiaireSchema = require('../../helpers/stagiaire.validator')

router.get('/api/stagiaires/', (req,res)=>{
    Stagiaire.find({})
    .then( (stagiaires) => {
        res.send({ 
            status : "OK",
            details : stagiaires.filter(stagiaire => stagiaire.deleted == false)
        });
    }).catch((err)=>{
        res.send({
            status : "ERROR",
            details : err
        });
    });
});

module.exports = router;