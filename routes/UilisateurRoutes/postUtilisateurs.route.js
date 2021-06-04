const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateur.model");
const utilisateurSchema = require('../../helpers/utilisateur.validator')

router.post('/api/utilisateurs/:id_admin',(req,res)=>{
    Utilisateur.findById(req.params.id_admin)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            utilisateurSchema.validateAsync(req.body)
            .then(()=>{
                Utilisateur.create(req.body)
                .then((utilisateur)=>{
                    res.send({
                        status : "OK",
                        message : "utilisateur ajouté avec succès!",
                        details : utilisateur
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