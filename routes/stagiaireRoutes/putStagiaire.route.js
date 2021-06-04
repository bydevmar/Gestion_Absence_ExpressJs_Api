const express = require("express");
const router = express.Router();

const Stagiaire = require("../../models/Stagiaire.model");
const Utilisateur = require("../../models/Utilisateur.model");
const stagiaireSchema = require('../../helpers/stagiaire.validator');

router.put('/api/stagiaires/:id_admin/:id_s',(req,res)=>{
    Utilisateur.findById(req.params.id_admin)
    .then( (utilisateur) => {
        if( utilisateur.type == "Gestionnaire"){
            stagiaireSchema.validateAsync(req.body)
            .then((result)=>{
                Stagiaire.updateOne({ _id : req.params.id_s } , req.body )
                .then( ()=> {
                    res.status(200).send({
                        status : "OK",
                        message : "stagiaires modifié avec succès!",
                        details : result
                    });
                }).catch(()=>{
                    res.send({
                        status : "ERROR",
                        message : "stagiaire non trouvé"
                    })
                })
            })
            .catch((err)=>{
                res.send({
                    status : "ERROR",
                    message : err.details[0].message
                })
            })
        }else{
            res.send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }})
    .catch(()=>{
        res.send({
            status : "ERROR",
            message : "aucun compte corresponde!"
        });
    })
})

module.exports = router;