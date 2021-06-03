const express = require("express");
const router = express.Router();

const Affectation = require("../../models/Affectation.model");
const Utilisateur = require("../../models/Utilisateur.model");
const affectationSchema = require('../../helpers/Affectation.validator')

router.put('/api/affectations/:id_g/:id_u',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async ( utilisateur ) => {
        if( utilisateur.type == "Gestionnaire"){
            await affectationSchema.validateAsync(req.body)
            .then((result)=>{
                Affectation.updateOne({ _id : req.params.id_u } , req.body )
                .then( ()=> {
                    res.status(200).send({
                        status : "OK",
                        message : "affectationx modifié avec succès!",
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