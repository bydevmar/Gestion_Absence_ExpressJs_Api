const express = require("express");
const router = express.Router();

const Niveau = require("../../models/Niveau.model");
const Utilisateur = require("../../models/Utilisateur.model");
const niveauSchema = require('../../helpers/Niveau.validator')

router.post('/api/niveaux/:id_admin',(req,res)=>{
    Utilisateur.findById(req.params.id_admin)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            niveauSchema.validateAsync(req.body)
            .then(()=>{
                Niveau.create(req.body)
                .then((niveau)=>{
                    res.send({
                        status : "OK",
                        message : "niveau ajouté avec succès!",
                        details : niveau
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