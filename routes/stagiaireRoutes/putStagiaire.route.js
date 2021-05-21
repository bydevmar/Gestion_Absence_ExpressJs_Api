const express = require("express");
const router = express.Router();

const Stagiaire = require("../../models/Stagiaire.model");
const Utilisateur = require("../../models/Utilisateur.model");
const stagiaireSchema = require('../../helpers/stagiaire.validator')

router.put('/api/stagiaires/:id_g/:id_u',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async ( utilisateur ) => {
        if( utilisateur.type == "Gestionnaire"){
            await stagiaireSchema.validateAsync(req.body)
            .then((result)=>{
                Stagiaire.updateOne({ _id : req.params.id_u } , req.body )
                .then( ()=> {
                    res.status(200).send({
                        status : "OK",
                        message : "stagiaires modifié avec succès!",
                        details : result
                    });
                })
            })
            .catch((err)=>{
                res.send({
                    status : "ERROR",
                    message : err.details[0].message
                })
            })
        }else{
            res.status(400).send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }})
    .catch(()=>{
        res.status(400).send({
            status : "ERROR",
            message : "aucun compte corresponde!"
        });
    })
})



module.exports = router;