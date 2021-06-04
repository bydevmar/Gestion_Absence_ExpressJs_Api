const express = require("express");
const router = express.Router();

const Affectation = require("../../models/Affectation.model");
const Utilisateur = require("../../models/Utilisateur.model");
const affectationSchema = require('../../helpers/Affectation.validator')

router.post('/api/affectations/:id_admin',(req,res)=>{
    Utilisateur.findById(req.params.id_admin)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
             affectationSchema.validateAsync(req.body)
            .then(()=>{
                Affectation.create(req.body)
                .then((affectation)=>{
                    res.send({
                        status : "OK",
                        message : "affectation ajouté avec succès!",
                        details : affectation
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