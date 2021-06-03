const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateur.model");

router.get('/api/formateurs/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Utilisateur.find({"type" : "Formateur" })
            .then((utilisateurs)=>{
                res.send({
                    status : "OK",
                    details : utilisateurs.filter(user  => user.deleted == false)
                });
            }).catch((err)=>{
                res.send({
                    status : "ERROR",
                    details : err
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