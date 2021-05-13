const express = require("express");
const router = express.Router();

const Filier = require("../../models/Filiers.model");
const Utilisateur = require("../../models/Utilisateurs.model");
const filierSchema = require('../../helpers/filier.validator')

router.post('/api/filiers/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async(utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            await filierSchema.validateAsync(req.body)
            .then(()=>{
                Filier.create(req.body)
                .then((filier)=>{
                    res.send({
                        status : "OK",
                        message : "filier ajouté avec succès!",
                        details : filier
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