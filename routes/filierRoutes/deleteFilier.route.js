const express = require("express");
const router = express.Router();

const Filier = require("../../models/Filiers.model");
const Utilisateur = require("../../models/Utilisateurs.model");

router.delete("/api/filiers/:id_g/:id_n", (req,res) => {
    Utilisateur.findById(req.params.id_g)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Filier.findById(req.params.id_n)
            .then((filier)=>{
                if(filier.deleted == true){
                    return res.send({
                        status : "ERROR",
                        message : "filier deja supprimé!"
                    });
                }
                filier.delete()
                .then((delfilier)=>{
                    res.status(400).send({
                        status : "OK",
                        message : "filier supprimé avec succès!",
                        details : delfilier
                    });
                })
            }).catch(()=>{
                res.status(400).send({
                    status : "ERROR",
                    message : "aucun compte corresponde!"
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
            message : "administrateur non trouvable!"
        });
    })
});

module.exports = router;