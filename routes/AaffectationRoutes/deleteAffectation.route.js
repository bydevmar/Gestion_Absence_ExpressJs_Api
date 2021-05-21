const express = require("express");
const router = express.Router();

const Affectation = require("../../models/Affectation.model");
const Utilisateur = require("../../models/Utilisateur.model");

router.delete("/api/affectations/:id_g/:id_n", (req,res) => {
    Utilisateur.findById(req.params.id_g)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Affectation.findById(req.params.id_n)
            .then((affectation)=>{
                if(affectation.deleted == true){
                    return res.send({
                        status : "ERROR",
                        message : "affectation deja supprimé!"
                    });
                }
                affectation.delete()
                .then((delaffectation)=>{
                    res.status(400).send({
                        status : "OK",
                        message : "affectation supprimé avec succès!",
                        details : delaffectation
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