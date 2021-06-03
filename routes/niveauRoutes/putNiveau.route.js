const express = require("express");
const router = express.Router();

const Niveau = require("../../models/Niveau.model");
const Utilisateur = require("../../models/Utilisateur.model");
const niveauSchema = require('../../helpers/Niveau.validator')



router.put('/api/niveaux/:id_g/:id_u',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async ( utilisateur ) => {
        if( utilisateur.type == "Gestionnaire"){
            await niveauSchema.validateAsync(req.body)
            .then((result)=>{
                Niveau.updateOne({ _id : req.params.id_u } , req.body )
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