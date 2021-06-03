const express = require("express");
const router = express.Router();

const Groupe = require("../../models/Groupe.model");
const Utilisateur = require("../../models/Utilisateur.model");

router.delete("/api/groupes/:id_admin/:id_groupe", (req,res) => {
    Utilisateur.findById(req.params.id_admin)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Groupe.findById(req.params.id_groupe)
            .then((groupe)=>{
                if(groupe.deleted == true){
                    return res.send({
                        status : "ERROR",
                        message : "Aucun groupe trouvable!"
                    });
                }
                groupe.delete()
                .then((delgroupe)=>{
                    res.send({
                        status : "OK",
                        message : "groupe supprimé avec succès!",
                        details : delgroupe
                    });
                })
            }).catch(()=>{
                res.send({
                    status : "ERROR",
                    message : "aucun compte corresponde!"
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