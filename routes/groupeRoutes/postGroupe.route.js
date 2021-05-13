const express = require("express");
const router = express.Router();

const Groupe = require("../../models/Groupes.model");
const Utilisateur = require("../../models/Utilisateurs.model");
const groupeSchema = require('../../helpers/groupex.validator')

router.post('/api/groupes/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async(utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            await groupeSchema.validateAsync(req.body)
            .then(()=>{
                Groupe.create(req.body)
                .then((groupe)=>{
                    res.send({
                        status : "OK",
                        message : "groupe ajouté avec succès!",
                        details : groupe
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