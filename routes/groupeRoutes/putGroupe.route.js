const express = require("express");
const router = express.Router();

const Groupe = require("../../models/Groupe.model");
const Utilisateur = require("../../models/Utilisateur.model");
const groupeSchema = require('../../helpers/Groupe.validator')

router.put('/api/groupes/:id_admin/:id_groupe',(req,res)=>{
    Utilisateur.findById(req.params.id_admin)
    .then(( utilisateur ) => {
        if( utilisateur.type == "Gestionnaire"){
            groupeSchema.validateAsync(req.body)
            .then((result)=>{
                Groupe.updateOne({ _id : req.params.id_groupe } , req.body )
                .then( ()=> {
                    res.status(200).send({
                        status : "OK",
                        message : "Groupe modifié avec succès!",
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
                message : "vous etes pas un administrateur!"
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