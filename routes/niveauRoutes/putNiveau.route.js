const express = require("express");
const router = express.Router();

const Niveau = require("../../models/Niveau.model");
const Utilisateur = require("../../models/Utilisateur.model");
const niveauSchema = require('../../helpers/Niveau.validator')

router.put('/api/niveaux/:id_admin/:id_niveau',(req,res)=>{
    Utilisateur.findById(req.params.id_admin)
    .then( ( utilisateur ) => {
        if( utilisateur.type == "Gestionnaire"){
             niveauSchema.validateAsync(req.body)
            .then((result)=>{
                Niveau.updateOne({ _id : req.params.id_niveau } , req.body )
                .then( ()=> {
                    res.status(200).send({
                        status : "OK",
                        message : "niveaux modifié avec succès!",
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