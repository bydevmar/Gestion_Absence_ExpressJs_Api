const express = require("express");
const router = express.Router();

const Stagiaire = require("../../models/Stagiaires.model");
const Utilisateur = require("../../models/Utilisateurs.model");
const stagiaireSchema = require('../../helpers/stagiaire.validator')

router.post('/api/stagiaires/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async(utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            await stagiaireSchema.validateAsync(req.body)
            .then(()=>{
                Stagiaire.create(req.body)
                .then((stagiaire)=>{
                    res.send({
                        status : "OK",
                        message : "stagiaire ajouté avec succès!",
                        details : stagiaire
                    });
            })
            }).catch((err)=>{
                res.send({
                    status : "ERROR",
                    message : err.details[0].message
                });
            })
        }
        else{
            res.status(400).send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }
    }).catch(()=>{
        res.status(400).send({
            status : "ERROR",
            message : "aucun compte corresponde!"
        });
    })
});

module.exports = router;