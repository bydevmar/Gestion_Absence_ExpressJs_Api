const express = require("express");
const router = express.Router();

const Niveau = require("../../models/Niveaux.model");
const Utilisateur = require("../../models/Utilisateurs.model");
const niveauSchema = require('../../helpers/niveaux.validator')

router.post('/api/niveaux/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async(utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            await niveauSchema.validateAsync(req.body)
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