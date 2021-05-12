const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateurs.model");

router.get('/api/utilisateurs/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async(utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Utilisateur.find({})
            .then((utilisateurs)=>{
                res.send({
                    status : "OK",
                    result : utilisateurs.filter(user  => user.deleted == false)
                });
            }).catch((err)=>{
                res.send({
                    status : "ERROR",
                    details : err
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