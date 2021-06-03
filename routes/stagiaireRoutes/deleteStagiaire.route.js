const express = require("express");
const router = express.Router();

const Stagiaire = require("../../models/Stagiaire.model");
const Utilisateur = require("../../models/Utilisateur.model");

router.delete("/api/stagiaires/:id_g/:id_s", (req,res) => {
    Utilisateur.findById(req.params.id_g)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Stagiaire.findById(req.params.id_s)
            .then((stagiaire)=>{
                if(stagiaire.deleted == true){
                    return res.send({
                        status : "ERROR",
                        message : "stagiaire deja supprimé!"
                    });
                }
                stagiaire.delete()
                .then((delstagiaire)=>{
                    res.send({
                        status : "OK",
                        message : "stagiaire supprimé avec succès!",
                        details : delstagiaire
                    });
                })
            }).catch(()=>{
                res.send({
                    status : "ERROR",
                    message : "aucun stagiaire corresponde!"
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
            message : "administrateur non trouvable!"
        });
    })
});

module.exports = router;