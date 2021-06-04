const express = require("express");
const router = express.Router();

const Filier = require("../../models/Filier.model");
const Utilisateur = require("../../models/Utilisateur.model");
const filierSchema = require('../../helpers/filier.validator')

router.post('/api/filiers/:id_admin',(req,res)=>{
    Utilisateur.findById(req.params.id_admin)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            filierSchema.validateAsync(req.body)
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