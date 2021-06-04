const express = require("express");
const router = express.Router();

const Stagiaire = require("../../models/Stagiaire.model");
const Utilisateur = require("../../models/Utilisateur.model");
const stagiaireSchema = require('../../helpers/stagiaire.validator')

router.post('/api/stagiaires/:id_admin',(req,res)=>{
    Utilisateur.findById(req.params.id_admin)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            stagiaireSchema.validateAsync(req.body)
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
            res.send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }
    }).catch(()=>{
        res.send({
            status : "ERROR",
            message : "aucun compte corresponde!"
        });
    })
});

module.exports = router;